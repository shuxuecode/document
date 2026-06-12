/**
 * M3U8 Sniffer - Content Script
 * 在视频播放区域下方展示 m3u8 链接条，带一键复制按钮
 * 使用 Shadow DOM 隻离样式，防止页面 CSS 影响
 *
 * 重要：只有收到 background 发来的 start_sniff 消息后才开始工作，
 * 用户点击插件图标才触发检测。
 */

// 是否为主框架
const isTopFrame = window.self === window.top;

// 是否已激活（用户点击图标后）
let sniffingActive = false;

// 存储检测到的 m3u8 URL
let m3u8Urls = [];

// bar 实例引用
let barInstance = null;

// MutationObserver 引用
let observer = null;
let debounceTimer = null;

// ============ 接收 background 消息 ============

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // 用户点击图标 → 开始检测
  if (message.type === "start_sniff") {
    sniffingActive = true;
    m3u8Urls = [];
    removeBar();
    initSniffing();
    sendResponse({ ok: true });
  }

  // 检测到新的 m3u8 URL
  if (message.type === "m3u8_found" && sniffingActive) {
    const exists = m3u8Urls.some(item => item.url === message.url);
    if (!exists) {
      m3u8Urls.push({ url: message.url, timestamp: message.timestamp || Date.now() });
      showOrUpdateBar();
    }
    sendResponse({ ok: true });
  }

  // 页面导航 → 清空重来
  if (message.type === "m3u8_clear") {
    m3u8Urls = [];
    removeBar();
    // 重新初始化（如果仍在激活状态）
    if (sniffingActive) {
      initSniffing();
    }
    sendResponse({ ok: true });
  }

  return true;
});

// ============ 激活后初始化 ============

function initSniffing() {
  // 先拉取 background 中已有的 m3u8 列表
  fetchExistingUrls();
  // 启动 DOM 监听（处理延迟加载的视频）
  startObserving();
}

function fetchExistingUrls() {
  try {
    chrome.runtime.sendMessage({ type: "get_m3u8_list" }, function (response) {
      if (chrome.runtime.lastError) return;
      if (response && response.urls && response.urls.length > 0) {
        m3u8Urls = response.urls;
        showOrUpdateBar();
      }
    });
  } catch {}
}

// ============ Shadow DOM Bar 实现 ============

const BAR_CSS = `
:host {
  all: initial;
  display: block;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 13px;
  line-height: 1.5;
  color: #eee;
}

.sniffer-bar {
  background: #1a1a2e;
  border-top: 2px solid #e94560;
  padding: 0;
  overflow: hidden;
  width: 100%;
}

.sniffer-bar-global {
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.5);
  border-top-width: 3px;
}

.sniffer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #16213e;
  border-bottom: 1px solid #0f3460;
}

.sniffer-title {
  font-weight: 600;
  font-size: 14px;
  color: #e94560;
  letter-spacing: 0.5px;
}

.sniffer-close {
  background: none;
  border: none;
  color: #888;
  font-size: 18px;
  cursor: pointer;
  padding: 2px 6px;
  line-height: 1;
  border-radius: 4px;
  transition: color 0.2s, background 0.2s;
}

.sniffer-close:hover {
  color: #fff;
  background: rgba(233, 69, 96, 0.3);
}

.sniffer-list {
  padding: 6px 12px;
  max-height: 200px;
  overflow-y: auto;
}

.sniffer-list::-webkit-scrollbar {
  width: 6px;
}

.sniffer-list::-webkit-scrollbar-track {
  background: #1a1a2e;
}

.sniffer-list::-webkit-scrollbar-thumb {
  background: #0f3460;
  border-radius: 3px;
}

.sniffer-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
  border-bottom: 1px solid rgba(15, 52, 96, 0.5);
}

.sniffer-row:last-child {
  border-bottom: none;
}

.sniffer-link {
  flex: 1;
  color: #53a8b6;
  text-decoration: none;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.2s;
  min-width: 0;
}

.sniffer-link:hover {
  color: #e94560;
  text-decoration: underline;
}

.sniffer-copy {
  flex-shrink: 0;
  background: #0f3460;
  color: #e94560;
  border: 1px solid #e94560;
  border-radius: 4px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.1s;
  white-space: nowrap;
}

.sniffer-copy:hover {
  background: #e94560;
  color: #fff;
}

.sniffer-copy:active {
  transform: scale(0.95);
}

.sniffer-copied {
  background: #53a8b6 !important;
  color: #fff !important;
  border-color: #53a8b6 !important;
}

.sniffer-copyall-row {
  display: flex;
  justify-content: center;
  padding: 8px 0 4px 0;
}

.sniffer-copy-all {
  background: #0f3460;
  color: #e94560;
  border: 1px solid #e94560;
  border-radius: 4px;
  padding: 6px 20px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.sniffer-copy-all:hover {
  background: #e94560;
  color: #fff;
}

.sniffer-empty {
  padding: 12px;
  text-align: center;
  color: #888;
  font-size: 13px;
}

.sniffer-empty .sniffer-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #e94560;
  border-radius: 50%;
  margin-right: 6px;
  animation: sniffer-pulse 1.2s ease-in-out infinite;
}

@keyframes sniffer-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
`;

// 创建带 Shadow DOM 的 bar 容器
function createBarHost(global = false) {
  const host = document.createElement("m3u8-sniffer-bar");
  host.style.display = "block";
  host.style.zIndex = "2147483647";

  if (global) {
    host.style.position = "fixed";
    host.style.bottom = "0";
    host.style.left = "0";
    host.style.right = "0";
    host.style.width = "100vw";
  }

  const shadow = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = BAR_CSS;
  shadow.appendChild(style);

  const bar = document.createElement("div");
  bar.className = global ? "sniffer-bar sniffer-bar-global" : "sniffer-bar";
  shadow.appendChild(bar);

  return { host, shadow, bar };
}

// 查找视频元素
function findVideoElement() {
  const videos = document.querySelectorAll("video");
  const audios = document.querySelectorAll("audio");
  if (videos.length > 0) return videos[0];
  if (audios.length > 0) return audios[0];
  return null;
}

// 找到适合插入 bar 的播放器容器
function findPlayerContainer(videoEl) {
  let current = videoEl.parentElement;
  while (current && current !== document.body && current !== document.documentElement) {
    const style = window.getComputedStyle(current);
    if (style.overflow === "hidden" || style.overflowX === "hidden" || style.overflowY === "hidden") {
      current = current.parentElement;
      continue;
    }
    const rect = current.getBoundingClientRect();
    const videoRect = videoEl.getBoundingClientRect();
    if (rect.width >= videoRect.width * 0.8 && rect.height >= videoRect.height) {
      return current;
    }
    current = current.parentElement;
  }
  return videoEl.parentElement || null;
}

// ============ 展示/更新 bar ============

function showOrUpdateBar() {
  if (!sniffingActive) return;

  const video = findVideoElement();

  if (!video) {
    if (isTopFrame) {
      showGlobalBar();
    }
    return;
  }

  showVideoBar(video);
}

function showVideoBar(video) {
  if (barInstance) {
    renderContent(barInstance.bar, m3u8Urls);
    return;
  }

  const container = findPlayerContainer(video);
  if (!container) {
    if (isTopFrame) showGlobalBar();
    return;
  }

  const { host, shadow, bar } = createBarHost(false);
  barInstance = { host, shadow, bar };

  if (container.nextSibling) {
    container.parentNode.insertBefore(host, container.nextSibling);
  } else {
    container.parentNode.appendChild(host);
  }

  renderContent(bar, m3u8Urls);
}

function showGlobalBar() {
  if (barInstance) {
    renderContent(barInstance.bar, m3u8Urls);
    return;
  }

  const { host, shadow, bar } = createBarHost(true);
  barInstance = { host, shadow, bar };
  document.body.appendChild(host);
  renderContent(bar, m3u8Urls);
}

function removeBar() {
  if (barInstance && barInstance.host.parentNode) {
    barInstance.host.parentNode.removeChild(barInstance.host);
  }
  barInstance = null;
}

// ============ 渲染 bar 内容 ============

function renderContent(bar, urls) {
  bar.innerHTML = "";

  if (!urls.length) {
    // 还没检测到 m3u8，显示等待提示
    const empty = document.createElement("div");
    empty.className = "sniffer-empty";
    const dot = document.createElement("span");
    dot.className = "sniffer-dot";
    empty.appendChild(dot);
    empty.appendChild(document.createTextNode("正在监听 m3u8 请求，请播放视频..."));
    bar.appendChild(empty);
    return;
  }

  // 标题栏
  const header = document.createElement("div");
  header.className = "sniffer-header";

  const title = document.createElement("span");
  title.className = "sniffer-title";
  title.textContent = `M3U8 链接 (${urls.length})`;
  header.appendChild(title);

  const closeBtn = document.createElement("button");
  closeBtn.className = "sniffer-close";
  closeBtn.textContent = "×";
  closeBtn.title = "隐藏";
  closeBtn.addEventListener("click", function () {
    barInstance.host.style.display = "none";
  });
  header.appendChild(closeBtn);
  bar.appendChild(header);

  // 链接列表
  const list = document.createElement("div");
  list.className = "sniffer-list";

  for (const item of urls) {
    const row = document.createElement("div");
    row.className = "sniffer-row";

    const link = document.createElement("a");
    link.className = "sniffer-link";
    link.href = item.url;
    link.target = "_blank";
    link.textContent = simplifyUrl(item.url);
    link.title = item.url;
    row.appendChild(link);

    const copyBtn = document.createElement("button");
    copyBtn.className = "sniffer-copy";
    copyBtn.textContent = "复制";
    copyBtn.addEventListener("click", function () {
      copyToClipboard(item.url, copyBtn);
    });
    row.appendChild(copyBtn);

    list.appendChild(row);
  }

  // 多链接时显示"复制全部"按钮
  if (urls.length > 1) {
    const copyAllRow = document.createElement("div");
    copyAllRow.className = "sniffer-copyall-row";
    const copyAllBtn = document.createElement("button");
    copyAllBtn.className = "sniffer-copy-all";
    copyAllBtn.textContent = "复制全部链接";
    copyAllBtn.addEventListener("click", function () {
      const allText = urls.map(u => u.url).join("\n");
      copyToClipboard(allText, copyAllBtn);
    });
    copyAllRow.appendChild(copyAllBtn);
    list.appendChild(copyAllRow);
  }

  bar.appendChild(list);
}

// ============ 辅助函数 ============

function simplifyUrl(url) {
  if (url.length <= 80) return url;
  return url.substring(0, 40) + "..." + url.substring(url.length - 35);
}

function copyToClipboard(text, btn) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showCopied(btn);
    }).catch(() => {
      fallbackCopy(text, btn);
    });
  } else {
    fallbackCopy(text, btn);
  }
}

function showCopied(btn) {
  btn.textContent = "已复制 ✓";
  btn.classList.add("sniffer-copied");
  setTimeout(() => {
    btn.textContent = "复制";
    btn.classList.remove("sniffer-copied");
  }, 2000);
}

function fallbackCopy(text, btn) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    showCopied(btn);
  } catch {
    btn.textContent = "复制失败";
    setTimeout(() => { btn.textContent = "复制"; }, 2000);
  }
  document.body.removeChild(textarea);
}

// ============ DOM 变化监听（延迟加载的视频） ============

function startObserving() {
  if (observer) return; // 已注册，重复点击不需要重新注册

  observer = new MutationObserver(function () {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (sniffingActive && !barInstance) {
        showOrUpdateBar();
      }
    }, 500);
  });

  observer.observe(document.body || document.documentElement, {
    childList: true,
    subtree: true,
  });
}

// 不在页面加载时自动做任何事 —— 每次点击图标都触发 start_sniff，从头开始
