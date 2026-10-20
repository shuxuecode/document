/**
 * utils.js - 工具函数
 * 复用了原 noteByGit 项目的 base64 编解码和 markdown 渲染逻辑
 */

// ===== Base64 编解码（支持中文）=====

function base64Encode(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function base64Decode(base64EncodedString) {
    var binaryStr = atob(base64EncodedString);
    var codeUnits = new Array(binaryStr.length);
    for (var i = 0; i < binaryStr.length; i++) {
        codeUnits[i] = binaryStr.charCodeAt(i);
    }
    var uriComponent = codeUnits
        .map(function(ch) { return '%' + ('00' + ch.toString(16)).slice(-2); })
        .join('');
    return decodeURIComponent(uriComponent);
}


// ===== Markdown 渲染器（替代 markdown-it）=====

function renderMarkdown(text) {
    if (!text) return '';

    // 提取代码块，避免被其他规则处理
    var codeBlocks = [];
    text = text.replace(/```(\w*)\n([\s\S]*?)```/g, function(match, lang, code) {
        var idx = codeBlocks.length;
        codeBlocks.push('<pre><code>' + escapeHtml(code.replace(/\n$/, '')) + '</code></pre>');
        return '\n%%CB' + idx + '%%\n';
    });

    // 提取行内代码
    var inlineCodes = [];
    text = text.replace(/`([^`\n]+)`/g, function(match, code) {
        var idx = inlineCodes.length;
        inlineCodes.push('<code>' + escapeHtml(code) + '</code>');
        return '%%IC' + idx + '%%';
    });

    var lines = text.split('\n');
    var html = '';
    var inUl = false;
    var inOl = false;

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var trimmed = line.trim();

        // 代码块占位符
        var cbMatch = trimmed.match(/^%%CB(\d+)%%$/);
        if (cbMatch) {
            if (inUl) { html += '</ul>'; inUl = false; }
            if (inOl) { html += '</ol>'; inOl = false; }
            html += codeBlocks[parseInt(cbMatch[1])];
            continue;
        }

        // 标题
        var headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
        if (headingMatch) {
            if (inUl) { html += '</ul>'; inUl = false; }
            if (inOl) { html += '</ol>'; inOl = false; }
            var level = headingMatch[1].length;
            html += '<h' + level + '>' + inlineFormat(headingMatch[2]) + '</h' + level + '>';
            continue;
        }

        // 分隔线
        if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
            if (inUl) { html += '</ul>'; inUl = false; }
            if (inOl) { html += '</ol>'; inOl = false; }
            html += '<hr>';
            continue;
        }

        // 无序列表
        var ulMatch = line.match(/^[\s]*[-*+]\s+(.+)$/);
        if (ulMatch) {
            if (!inUl) { html += '<ul>'; inUl = true; }
            html += '<li>' + inlineFormat(ulMatch[1]) + '</li>';
            continue;
        }

        // 有序列表
        var olMatch = line.match(/^[\s]*\d+\.\s+(.+)$/);
        if (olMatch) {
            if (!inOl) { html += '<ol>'; inOl = true; }
            html += '<li>' + inlineFormat(olMatch[1]) + '</li>';
            continue;
        }

        // 引用
        var bqMatch = line.match(/^>\s*(.*)$/);
        if (bqMatch) {
            if (inUl) { html += '</ul>'; inUl = false; }
            if (inOl) { html += '</ol>'; inOl = false; }
            html += '<blockquote>' + inlineFormat(bqMatch[1]) + '</blockquote>';
            continue;
        }

        // 关闭列表
        if (inUl && trimmed === '') { html += '</ul>'; inUl = false; continue; }
        if (inOl && trimmed === '') { html += '</ol>'; inOl = false; continue; }
        if (inUl) { html += '</ul>'; inUl = false; }
        if (inOl) { html += '</ol>'; inOl = false; }

        // 空行
        if (trimmed === '') {
            continue;
        }

        // 普通段落
        html += '<p>' + inlineFormat(line) + '</p>';
    }

    // 关闭未结束的列表
    if (inUl) html += '</ul>';
    if (inOl) html += '</ol>';

    // 恢复行内代码
    html = html.replace(/%%IC(\d+)%%/g, function(match, idx) {
        return inlineCodes[parseInt(idx)];
    });

    return html;
}


// URL 协议白名单：仅允许 http/https/相对路径/锚点，拦截 javascript:/data: 等危险协议
function sanitizeUrl(url) {
    var probe = url.replace(/&amp;/g, '&').replace(/[\u0000-\u0020]/g, '').toLowerCase();
    if (/^(javascript|data|vbscript|file):/.test(probe)) return '#';
    return url;
}

// 行内格式化（粗体、斜体、链接、图片）
function inlineFormat(text) {
    // 先整体转义，防止笔记中的原始 HTML 注入预览区
    text = escapeHtml(text);
    // 图片（先于链接处理）
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, function(match, alt, url) {
        return '<img src="' + sanitizeUrl(url) + '" alt="' + alt + '" />';
    });
    // 链接
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(match, label, url) {
        return '<a href="' + sanitizeUrl(url) + '" target="_blank">' + label + '</a>';
    });
    // 粗体
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');
    // 斜体
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
    text = text.replace(/_(.+?)_/g, '<em>$1</em>');
    // 删除线
    text = text.replace(/~~(.+?)~~/g, '<del>$1</del>');

    return text;
}


// HTML 转义
function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}


// ===== 防抖（debounce）=====
// 连续触发时只在最后一次调用停顿 delay 毫秒后才真正执行，
// 用于 Markdown 实时预览等高频事件，避免每次击键都全量重渲染

function debounce(fn, delay) {
    var timer = null;
    return function() {
        var args = arguments;
        var ctx = this;
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(ctx, args);
        }, delay);
    };
}


// ===== 状态提示 =====

function showStatus(msg, type) {
    var el = document.getElementById('statusMsg');
    if (!el) return;
    el.textContent = msg;
    el.className = 'status-msg ' + (type === 'error' ? 'error' : 'ok');
}

function showTitle(msg) {
    showStatus(msg);
}
