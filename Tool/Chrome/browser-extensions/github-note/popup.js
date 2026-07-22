/**
 * popup.js - GitHub Note 浏览器扩展核心逻辑
 * 复用了原 noteByGit 项目的业务逻辑，将 localStorage 替换为 chrome.storage.local
 */

// ===== 全局变量 =====
var octo = undefined;
var repo = undefined;
var sha = undefined;

// 从 storage 缓存的 token/owner/repo（由配置页面管理）
var _cachedToken = '';
var _cachedOwner = '';
var _cachedRepo = '';
var _autoPull = false;

// ===== 存储适配器（替代 localStorage）=====
function saveConfig(key, value) {
    var obj = {};
    obj[key] = value;
    chrome.storage.local.set(obj);
}

function loadAllConfig(callback) {
    chrome.storage.local.get([
        'my_github_token', 'my_github_owner', 'my_github_repo',
        'my_github_branch', 'my_github_filepath', 'my_github_auto_pull'
    ], function(result) {
        // token/owner/repo 由配置页面管理，缓存到全局变量
        _cachedToken = result.my_github_token || '';
        _cachedOwner = result.my_github_owner || '';
        _cachedRepo  = result.my_github_repo || '';
        _autoPull    = !!result.my_github_auto_pull;

        // 更新配置状态栏
        updateConfigStatus();

        // 加载其他配置到表单
        if (result.my_github_branch)   $('#branch').val(result.my_github_branch);
        if (result.my_github_filepath) $('#filePath').val(result.my_github_filepath);
        if (callback) callback();
    });
}

function updateConfigStatus() {
    var tokenEl = document.getElementById('tokenStatus');
    var ownerEl = document.getElementById('ownerStatus');
    var statusEl = document.getElementById('configStatus');

    if (_cachedToken) {
        // 完全掩码：只显示 Token 类型前缀（如 ghp_），不暴露任何真实字符
        var prefixMatch = _cachedToken.match(/^[A-Za-z]+_/);
        tokenEl.textContent = (prefixMatch ? prefixMatch[0] : '') + '****';
    } else {
        tokenEl.textContent = '未设置';
    }

    ownerEl.textContent = _cachedOwner || '未设置';

    var repoEl = document.getElementById('repoStatus');
    repoEl.textContent = _cachedRepo || '未设置';

    // 根据配置状态切换样式
    if (_cachedToken && _cachedOwner && _cachedRepo) {
        statusEl.classList.add('configured');
    } else {
        statusEl.classList.remove('configured');
    }
}


// ===== 配置管理 =====

function setBranch() {
    saveConfig('my_github_branch', $('#branch').val());
    toastr.success('设置分支成功');
}

function setFilePath() {
    saveConfig('my_github_filepath', $('#filePath').val());
    toastr.success('设置filePath成功');
}


// ===== 初始化仓库连接 =====

function initRepo() {
    if (!_cachedToken || !_cachedOwner || !_cachedRepo) {
        return false;
    }

    octo = new Octokat({ token: _cachedToken });
    repo = octo.repos(_cachedOwner, _cachedRepo);
}


// ===== Pull（拉取文件内容）=====

function pullContent() {
    if (!repo) {
        toastr.error('repo未设置');
        return;
    }

    var $branch   = $('#branch').val().trim();
    var $filePath = $('#filePath').val().trim();

    repo.contents($filePath)
        .fetch({ ref: $branch })
        .then(function(info) {
            sha = info.sha;
            showTitle('sha=' + sha);
            var contents = base64Decode(info.content);
            $('#content').val(contents);
            updateLineNumbers();
            showPreview(contents);
            toastr.info('pull成功');
        })
        .catch(function(err) {
            console.error('pull失败:', err);
            toastr.error('pull失败: ' + (err.message || err));
        });
}


// ===== Push（推送文件内容）=====

function pushContent() {
    var $filePath = $('#filePath').val().trim();
    var $branch   = $('#branch').val().trim();

    if (!repo || !$filePath) {
        toastr.error('repo未配置');
        return;
    }

    var text = $('#content').val();
    var config = {
        message: 'Updating file',
        content: base64Encode(text),
        sha: sha
    };
    if ($branch) config.branch = $branch;

    repo.contents($filePath).add(config)
        .then(function(info) {
            console.log('File updated. new sha is', info.commit.sha);
            toastr.info('推送成功');
            pullContent();
        })
        .catch(function(err) {
            console.error('push失败:', err);
            toastr.error('推送失败: ' + (err.message || err));
        });
}


// ===== AddFile（新增文件）=====

function addFile() {
    var $filePath = $('#filePath').val().trim();
    var $branch   = $('#branch').val().trim();

    if (!repo) {
        toastr.error('repo未配置');
        return;
    }
    if (!$filePath) {
        toastr.error('文件路径未配置');
        return;
    }

    var text   = $('#content').val();
    var config = {
        message: 'add file',
        content: base64Encode(text)
    };
    if ($branch) config.branch = $branch;

    repo.contents($filePath).add(config)
        .then(function(result) {
            console.log('File add success.', result);
            toastr.info('添加成功');
        })
        .catch(function(error) {
            console.error('Failed to create file:', error);
            toastr.error('添加失败: ' + (error.message || error));
        });
}


// ===== DeleteFile（删除文件）=====

function deleteFile() {
    if (!confirm('确认删除文件?')) return;
    deleteFileFun();
}

function deleteFileFun() {
    var $filePath = $('#filePath').val().trim();
    var $branch   = $('#branch').val().trim();

    if (!repo || !$filePath) {
        toastr.error('repo未配置');
        return;
    }

    var config = { message: 'Deleting file', sha: sha };
    if ($branch) config.branch = $branch;

    repo.contents($filePath).remove(config)
        .then(function(result) {
            console.log('File Deleted.', result);
            toastr.info('删除成功');
        })
        .catch(function(error) {
            console.error('Delete error:', error);
            toastr.error('删除失败');
        });
}


// ===== RenameFile（重命名文件）=====

function renameFilePrompt() {
    var $filePath = $('#filePath').val().trim();
    var newFileName = prompt('请输入新的文件名', $filePath);
    if (newFileName !== null && newFileName !== $filePath) {
        renameFile(newFileName);
    }
}

function renameFile(newFileName) {
    var $filePath = $('#filePath').val().trim();
    var $branch   = $('#branch').val().trim();

    if (newFileName === $filePath) {
        toastr.error('文件名一模一样，请修改');
        return;
    }

    // 阶段1：获取旧文件内容和 SHA
    repo.contents($filePath).fetch({ ref: $branch })
        .then(function(info) {
            var config = {
                message: 'Rename file ' + $filePath + ' to ' + newFileName,
                content: info.content
            };
            if ($branch) config.branch = $branch;

            // 阶段2：创建新文件
            repo.contents(newFileName).add(config)
                .then(function() {
                    var delConfig = { message: 'Deleting file', sha: info.sha };
                    if ($branch) delConfig.branch = $branch;

                    // 阶段3：删除旧文件
                    repo.contents($filePath).remove(delConfig)
                        .then(function() {
                            toastr.info('重命名成功');
                            $('#filePath').val(newFileName);
                            saveConfig('my_github_filepath', newFileName);
                        })
                        .catch(function(err) {
                            console.error('Delete old file error:', err);
                            toastr.error('删除旧文件失败');
                        });
                })
                .catch(function(error) {
                    console.error('Create new file error:', error);
                    toastr.error('创建新文件失败');
                });
        });
}


// ===== GetFileList（获取文件列表）=====

function getFileList() {
    var $branch = $('#branch').val().trim();

    if (!_cachedToken || !_cachedOwner || !_cachedRepo) {
        toastr.error('配置为空，请先在设置页面配置 Token、Owner 和 Repo');
        return false;
    }

    octo = new Octokat({ token: _cachedToken });
    repo = octo.repos(_cachedOwner, _cachedRepo);

    repo.contents('').fetch({ ref: $branch })
        .then(function(contents) {
            var html = '';
            contents.items.forEach(function(file) {
                if (file.type === 'dir') {
                    html += '<div class="dir-item">';
                    html += '<button class="expand-btn" style="color:blue;">展开</button>';
                    html += '<span class="dir-name"> ' + escapeHtml(file.path) + '</span>';
                    html += '</div>';
                } else {
                    html += '<div class="dir-item">';
                    html += '<button class="open-btn">打开</button>';
                    html += '<span class="file-name"> ' + escapeHtml(file.path) + '</span>';
                    html += '</div>';
                }
            });
            $('#fileList').html(html);
        })
        .catch(function(err) {
            console.error('Get file list error:', err);
            toastr.error('获取文件列表失败');
        });
}


// ===== ExpandFile（展开目录）=====

function expandFile(e) {
    var filePath = $(e).next().text().trim();
    var $branch  = $('#branch').val().trim();

    repo.contents(filePath).fetch({ ref: $branch })
        .then(function(contents) {
            var html = '';
            contents.items.forEach(function(file) {
                if (file.type === 'dir') {
                    html += '<div class="dir-item sub-dir">';
                    html += '<button class="expand-btn" style="color:blue;">展开</button>';
                    html += '<span class="dir-name"> ' + escapeHtml(file.path) + '</span>';
                    html += '</div>';
                } else {
                    html += '<div class="dir-item sub-dir">';
                    html += '<button class="open-btn">打开</button>';
                    html += '<span class="file-name"> ' + escapeHtml(file.path) + '</span>';
                    html += '</div>';
                }
            });
            $(e).parent().append(html);
        });

    $(e).prop('disabled', true);
    $(e).css({ color: 'lightgray' });
}


// ===== OpenFile（打开文件）=====

function openFile(e) {
    var filePath = $(e).next().text().trim();
    var $branch  = $('#branch').val().trim();

    $('#filePath').val(filePath);
    saveConfig('my_github_filepath', filePath);

    repo.contents(filePath).fetch({ ref: $branch })
        .then(function(info) {
            sha = info.sha;
            showTitle('sha=' + sha);
            var contents = base64Decode(info.content);
            $('#content').val(contents);
            updateLineNumbers();
            showPreview(contents);
            toastr.info('pull成功');
        })
        .catch(function(err) {
            console.error('Open file error:', err);
            toastr.error('打开文件失败');
        });
}


// ===== GetBranchList（获取分支列表）=====

async function getBranchList() {
    if (!repo) {
        toastr.error('repo未配置，请先在设置页面配置');
        return;
    }

    var defaultBranch;
    try {
        defaultBranch = await getDefaultBranch();
    } catch (error) {
        toastr.error('获取默认分支失败');
        return;
    }

    repo.branches.fetch()
        .then(function(branches) {
            var html = '';
            branches.items.forEach(function(branch) {
                html += '<div class="branch-item">';
                html += '<button class="choose-branch-btn">使用该分支</button>';
                if (defaultBranch === branch.name) {
                    html += '<span class="branch-name branch-default"> ' + escapeHtml(branch.name) + '</span>';
                } else {
                    html += '<span class="branch-name"> ' + escapeHtml(branch.name) + '</span>';
                }
                html += '</div>';
            });
            $('#branchList').html(html);
        })
        .catch(function(error) {
            console.error('Error fetching branches:', error);
            toastr.error('获取分支列表失败');
        });
}


// ===== ChooseBranch（选择分支）=====

function chooseBranch(e) {
    var branch = $(e).next().text().trim();
    $('#branch').val(branch);
}


// ===== GetDefaultBranch（获取默认分支）=====

function getDefaultBranch() {
    return new Promise(function(resolve, reject) {
        repo.fetch()
            .then(function(repoInfo) {
                console.log('默认分支=', repoInfo.defaultBranch);
                resolve(repoInfo.defaultBranch);
            })
            .catch(function(error) {
                console.error('Error fetching repo info:', error);
                reject(error);
            });
    });
}


// ===== CreateBranch（创建新分支）=====

function createNewBranch() {
    var $branch = $('#branch').val().trim();

    if (!$branch) {
        toastr.error('新分支为空');
        return;
    }

    if (!repo) {
        toastr.error('repo未配置，请先在设置页面配置');
        return;
    }

    getDefaultBranch()
        .then(function(defaultBranch) {
            repo.branches(defaultBranch).fetch()
                .then(function(branchInfo) {
                    var baseBranchSHA = branchInfo.commit.sha;

                    repo.git.refs.create({
                        ref: 'refs/heads/' + $branch,
                        sha: baseBranchSHA
                    }).then(function() {
                        console.log('分支 ' + $branch + ' 创建成功');
                        toastr.success('分支 ' + $branch + ' 创建成功');
                    }).catch(function(error) {
                        console.error('创建新分支时出错:', error);
                        toastr.error('创建分支失败: ' + (error.message || error));
                    });
                })
                .catch(function(error) {
                    console.error('无法获取基准分支SHA:', error);
                    toastr.error('获取基准分支失败');
                });
        })
        .catch(function(error) {
            console.error('获取默认分支失败:', error);
            toastr.error('获取默认分支失败');
        });
}


// ===== Markdown 预览 =====

function showPreview(content) {
    var result = renderMarkdown(content);
    document.getElementById('preview').innerHTML = result;
}


// ===== 编辑器行号 =====

function updateLineNumbers() {
    var lines = document.getElementById('content').value.split('\n').length;
    var text = '';
    for (var i = 1; i <= lines; i++) {
        text += i + '\n';
    }
    document.getElementById('lineNumbers').textContent = text;
}


// ===== 前置检查 =====

function check() {
    if (!_cachedToken) {
        showStatus('Token 未设置，请打开设置页面配置', 'error');
        return;
    }
    if (!_cachedOwner) {
        showStatus('Owner 未设置，请打开设置页面配置', 'error');
        return;
    }
    if (!_cachedRepo) {
        showStatus('Repo 未设置，请打开设置页面配置', 'error');
        return;
    }
}


// ===== 初始化 =====

function init() {
    // toastr 配置
    toastr.options.positionClass = 'toast-center-center';

    // 页脚年份实时获取
    $('#footerYear').text(new Date().getFullYear());

    // 绑定按钮事件
    $('#updateBranch').on('click', setBranch);
    $('#updateFilePath').on('click', setFilePath);

    $('#pullBtn').on('click', pullContent);
    $('#pushBtn').on('click', pushContent);
    $('#addFileBtn').on('click', addFile);
    $('#deleteFileBtn').on('click', deleteFile);
    $('#renameFileBtn').on('click', renameFilePrompt);
    $('#createBranchBtn').on('click', createNewBranch);

    $('#getFileBtn').on('click', getFileList);
    $('#getBranchBtn').on('click', getBranchList);

    // 文件/分支列表动态按钮：事件委托（MV3 CSP 禁止内联 onclick）
    $('#fileList').on('click', '.expand-btn', function() {
        expandFile(this);
    });
    $('#fileList').on('click', '.open-btn', function() {
        openFile(this);
    });
    $('#branchList').on('click', '.choose-branch-btn', function() {
        chooseBranch(this);
    });

    $('#switchPreview').on('click', function() {
        var flag = $('#preview').css('display');
        if (flag === 'none') {
            $('#contentParent').css('flex', '1');
            $('#preview').show();
        } else {
            $('#preview').hide();
            $('#contentParent').css('flex', '2');
        }
    });

    // Markdown 实时预览 + 行号更新
    $('#content').on('input', function() {
        showPreview($(this).val());
        updateLineNumbers();
    });

    // 行号随编辑区同步滚动
    $('#content').on('scroll', function() {
        document.getElementById('lineNumbers').scrollTop = this.scrollTop;
    });

    // 初始化行号
    updateLineNumbers();

    // 打开设置页面
    $('#openOptionsBtn').on('click', function() {
        chrome.runtime.openOptionsPage();
    });

    // 在独立窗口中打开（可拖拉缩放，不受 800x600 限制）
    $('#openWindowBtn').on('click', function() {
        chrome.windows.create({
            url: chrome.runtime.getURL('popup.html?mode=window'),
            type: 'popup',
            width: 1000,
            height: 800
        });
        window.close();
    });

    // 独立窗口模式：宽度自适应，隐藏“独立窗口”按钮
    if (new URLSearchParams(window.location.search).get('mode') === 'window') {
        document.body.classList.add('window-mode');
        $('#openWindowBtn').hide();
    }

    // 从 chrome.storage 加载配置
    loadAllConfig(function() {
        check();
        initRepo();
        if (repo !== undefined) {
            showStatus('repo加载成功', 'ok');

            // 自动 Pull：开关开启且 filePath 已设置时，打开弹窗自动拉取内容
            if (_autoPull && $('#filePath').val().trim()) {
                pullContent();
            }
        }
    });
}


// 页面加载完成后初始化
$(document).ready(init);
