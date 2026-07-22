/**
 * options.js - 配置页面逻辑
 * 管理 Token 和 Owner 的持久化存储与连接测试
 */

// ===== 保存配置 =====
function saveOptions() {
    var token = document.getElementById('token').value.trim();
    var owner = document.getElementById('owner').value.trim();
    var repo  = document.getElementById('repo').value.trim();
    var autoPull = document.getElementById('autoPull').checked;

    chrome.storage.local.set({
        my_github_token: token,
        my_github_owner: owner,
        my_github_repo: repo,
        my_github_auto_pull: autoPull
    }, function() {
        showStatus('设置已保存', 'success');
        toastr.success('设置已保存');
    });
}


// ===== 加载配置 =====
function loadOptions() {
    chrome.storage.local.get(['my_github_token', 'my_github_owner', 'my_github_repo', 'my_github_auto_pull'], function(result) {
        if (result.my_github_token) document.getElementById('token').value = result.my_github_token;
        if (result.my_github_owner) document.getElementById('owner').value = result.my_github_owner;
        if (result.my_github_repo)  document.getElementById('repo').value  = result.my_github_repo;
        document.getElementById('autoPull').checked = !!result.my_github_auto_pull;
    });
}


// ===== 清除配置 =====
function clearOptions() {
    if (!confirm('确认清除所有配置？此操作不可恢复。')) return;

    chrome.storage.local.clear(function() {
        document.getElementById('token').value = '';
        document.getElementById('owner').value = '';
        document.getElementById('repo').value = '';
        document.getElementById('testRepo').value = '';
        document.getElementById('autoPull').checked = false;
        showStatus('所有配置已清除', 'info');
        toastr.info('所有配置已清除');
    });
}


// ===== 连接测试 =====

// HTML 转义（防止 API 返回值/用户输入注入 innerHTML）
function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function testConnection() {
    var token = document.getElementById('token').value.trim();
    var owner = document.getElementById('owner').value.trim();
    var testRepo = document.getElementById('testRepo').value.trim();
    var resultEl = document.getElementById('testResult');

    if (!token) {
        showTestResult('请先填写 Token', 'error');
        return;
    }

    resultEl.classList.remove('hidden');
    resultEl.innerHTML = '<span class="testing">⏳ 正在测试连接...</span>';

    // 测试 1：验证 Token 是否有效（获取用户信息）
    fetch('https://api.github.com/user', {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(function(response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
    })
    .then(function(user) {
        var html = '<div class="test-pass">';
        html += '✅ Token 有效！当前用户：<strong>' + escapeHtml(user.login) + '</strong>';
        html += '</div>';

        // 如果填写了 owner，测试 owner 是否可访问
        if (owner) {
            return fetch('https://api.github.com/users/' + owner, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }).then(function(resp) {
                if (resp.ok) {
                    html += '<div class="test-pass">✅ Owner "' + escapeHtml(owner) + '" 可访问</div>';
                } else {
                    html += '<div class="test-fail">⚠️ Owner "' + escapeHtml(owner) + '" 无法访问</div>';
                }
                return { html: html, owner: owner, token: token };
            });
        }
        return { html: html, owner: owner, token: token };
    })
    .then(function(data) {
        if (!data) return;
        var html = data.html;

        // 如果填写了测试仓库，测试仓库是否可访问
        if (testRepo && data.owner) {
            return fetch('https://api.github.com/repos/' + data.owner + '/' + testRepo, {
                headers: {
                    'Authorization': 'Bearer ' + data.token,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }).then(function(resp) {
                if (resp.ok) {
                    return resp.json().then(function(repoInfo) {
                        html += '<div class="test-pass">✅ 仓库 "' + escapeHtml(data.owner) + '/' + escapeHtml(testRepo) + '" 可访问（默认分支：' + escapeHtml(repoInfo.default_branch) + '）</div>';
                        showTestResultHtml(html);
                    });
                } else {
                    html += '<div class="test-fail">❌ 仓库 "' + escapeHtml(data.owner) + '/' + escapeHtml(testRepo) + '" 无法访问</div>';
                    showTestResultHtml(html);
                }
            });
        }
        showTestResultHtml(html);
    })
    .catch(function(error) {
        var msg = '连接失败';
        if (error.message && error.message.includes('401')) {
            msg = '❌ Token 无效或已过期，请重新生成';
        } else if (error.message && error.message.includes('403')) {
            msg = '❌ API 访问受限，请稍后再试';
        } else {
            msg = '❌ ' + msg + '：' + error.message;
        }
        showTestResult(msg, 'error');
    });
}


// ===== Token 显示/隐藏 =====
function toggleTokenVisibility() {
    var tokenInput = document.getElementById('token');
    if (tokenInput.type === 'password') {
        tokenInput.type = 'text';
    } else {
        tokenInput.type = 'password';
    }
}


// ===== UI 辅助函数 =====

function showStatus(msg, type) {
    var bar = document.getElementById('statusBar');
    var icon = document.getElementById('statusIcon');
    var text = document.getElementById('statusText');

    bar.classList.remove('hidden', 'success', 'error', 'info');
    bar.classList.add(type);
    icon.textContent = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    text.textContent = msg;

    // 3秒后自动隐藏
    setTimeout(function() {
        bar.classList.add('hidden');
    }, 3000);
}

function showTestResult(msg, type) {
    var el = document.getElementById('testResult');
    el.classList.remove('hidden');
    el.className = 'test-result ' + (type === 'error' ? 'test-fail' : 'test-pass');
    el.textContent = msg;
}

function showTestResultHtml(html) {
    var el = document.getElementById('testResult');
    el.classList.remove('hidden');
    el.className = 'test-result';
    el.innerHTML = html;
}


// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', function() {
    // toastr 配置：居中显示
    toastr.options.positionClass = 'toast-top-center';
    toastr.options.timeOut = 2000;

    loadOptions();

    // 页脚年份实时获取
    document.getElementById('footerYear').textContent = new Date().getFullYear();

    document.getElementById('saveBtn').addEventListener('click', saveOptions);
    document.getElementById('clearBtn').addEventListener('click', clearOptions);
    document.getElementById('testBtn').addEventListener('click', testConnection);
    document.getElementById('toggleToken').addEventListener('click', toggleTokenVisibility);

    // 快捷键 Ctrl+S 保存
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveOptions();
        }
    });
});
