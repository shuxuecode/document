/**
 * M3U8 Sniffer - Content Script
 * 页面加载完成后自动扫描网页中的 m3u8 链接
 * 在视频下方展示链接条 + 复制按钮（始终作为普通 DOM 插入，不固定在屏幕底部）
 * 使用 Shadow DOM 隻离样式
 */

// 是否为主框架
const isTopFrame = window.self === window.top;

// 检测到的 m3u8 URL
let m3u8Urls = [];

// bar 实例引用
let barInstance = null;

// MutationObserver
let observer = null;
let debounceTimer = null;

// ============ 接收 background 消息（网络请求检测到的 URL） ============

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "m3u8_found") {
    addUrl(message.url, message.timestamp);
    showOrUpdateBar();
    sendResponse({ ok: true });
  }

  if (message.type === "m3u8_clear") {
    m3u8Urls = [];
    removeBar();
    scanDOM();
    fetchNetworkUrls();
    startObserving();
    sendResponse({ ok: true });
  }

  return true;
});

// 添加 URL（去重）
function addUrl(url, timestamp) {
  if (m3u8Urls.some(item => item.url === url)) return;
  m3u8Urls.push({ url, timestamp: timestamp || Date.now() });
}

// ============ DOM 页面扫描 ============

const M3U8_REGEX = /["']((?:(?:https?:)?\/\/)[^"'\s]*?\.(?:m3u8|m3u)(?:\?[^"'\s]*)?)["']/gi;

function scanDOM() {
  scanMediaElements();
  scanSourceTags();
  scanInlineScripts();
  scanAttributes();

  if (m3u8Urls.length > 0) {
    showOrUpdateBar();
    reportToBackground();
  }
}

function scanMediaElements() {
  const mediaEls = document.querySelectorAll("video, audio");
  for (const el of mediaEls) {
    const src = el.src || el.currentSrc;
    if (src && looksLikeM3U8(src)) {
      addUrl(resolveUrl(src));
    }
  }
}

function scanSourceTags() {
  const sources = document.querySelectorAll("video source, audio source");
  for (const el of sources) {
    const src = el.src || el.getAttribute("src");
    if (src && looksLikeM3U8(src)) {
      addUrl(resolveUrl(src));
    }
  }
}

function scanInlineScripts() {
  const scripts = document.querySelectorAll("script:not([src])");
  for (const script of scripts) {
    const text = script.textContent;
    if (!text) continue;
    let match;
    M3U8_REGEX.lastIndex = 0;
    while ((match = M3U8_REGEX.exec(text)) !== null) {
      const url = match[1];
      if (looksLikeM3U8(url)) {
        addUrl(resolveUrl(url));
      }
    }
  }
}

function scanAttributes() {
  const attrNames = ["data-src", "data-url", "data-source", "data-playurl", "data-stream", "data-m3u8", "data-hls"];
  const allEls = document.querySelectorAll("*");
  for (const el of allEls) {
    for (const attr of attrNames) {
      const val = el.getAttribute(attr);
      if (val && looksLikeM3U8(val)) {
        addUrl(resolveUrl(val));
      }
    }
  }
}

// 严格匹配：只认 .m3u8/.m3u 文件扩展名或明确的 format/type/src 参数
function looksLikeM3U8(str) {
  try {
    const urlObj = new URL(str, window.location.href);
    const pathname = urlObj.pathname.toLowerCase();
    const lastSegment = pathname.split("/").pop() || "";
    const ext = lastSegment.split(".").pop();
    if (ext === "m3u8" || ext === "m3u") return true;
    for (const [key, value] of urlObj.searchParams.entries()) {
      const k = key.toLowerCase();
      const v = value.toLowerCase();
      if ((k === "format" || k === "type" || k === "src") && (v === "m3u8" || v === "m3u")) {
        return true;
      }
    }
    return false;
  } catch {
    const lower = str.toLowerCase().split("?")[0].split("#")[0];
    return lower.endsWith(".m3u8") || lower.endsWith(".m3u");
  }
}

function resolveUrl(url) {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return "https:" + url;
  try {
    return new URL(url, window.location.href).href;
  } catch {
    return url;
  }
}

function reportToBackground() {
  for (const item of m3u8Urls) {
    try {
      chrome.runtime.sendMessage({ type: "add_m3u8", url: item.url });
    } catch {}
  }
}

function fetchNetworkUrls() {
  try {
    chrome.runtime.sendMessage({ type: "get_m3u8_list" }, function (response) {
      if (chrome.runtime.lastError) return;
      if (response && response.urls && response.urls.length > 0) {
        for (const item of response.urls) {
          addUrl(item.url, item.timestamp);
        }
        if (m3u8Urls.length > 0) showOrUpdateBar();
      }
    });
  } catch {}
}

// ============ Shadow DOM Bar 实现 ============

const BAR_CSS = `
:host {
  all: initial;
  display: block;
  position: absolute;
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
`;

function createBarHost() {
  const host = document.createElement("m3u8-sniffer-bar");
  // 绝对定位，完全脱离页面布局流，不受 flex/grid 影响
  host.style.position = "absolute";
  host.style.zIndex = "2147483647";
  host.style.display = "block";
  host.style.pointerEvents = "auto";

  const shadow = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = BAR_CSS;
  shadow.appendChild(style);

  const bar = document.createElement("div");
  bar.className = "sniffer-bar";
  shadow.appendChild(bar);

  return { host, shadow, bar };
}

// ============ 视频定位 ============

function findVideoElement() {
  const videos = document.querySelectorAll("video");
  const audios = document.querySelectorAll("audio");
  if (videos.length > 0) return videos[0];
  if (audios.length > 0) return audios[0];
  return null;
}

// ============ 展示/更新 bar ============

function showOrUpdateBar() {
  const video = findVideoElement();
  if (!video) return;
  showVideoBar(video);
}

// 用绝对定位将 bar 贴在视频下方，不受页面任何布局影响
function showVideoBar(video) {
  if (barInstance) {
    renderContent(barInstance.bar, m3u8Urls);
    positionBar(video);
    return;
  }

  const { host, shadow, bar } = createBarHost();
  barInstance = { host, shadow, bar, video };

  // 挂到 body 上（绝对定位元素，不影响页面流）
  document.body.appendChild(host);
  renderContent(bar, m3u8Urls);
  positionBar(video);
}

// 根据 video 的可视位置，把 bar 精确对齐到视频正下方
function positionBar(video) {
  if (!barInstance) return;
  const host = barInstance.host;

  const rect = video.getBoundingClientRect();

  // bar 的宽度跟视频一样宽
  host.style.width = rect.width + "px";

  // left 对齐视频左边
  host.style.left = rect.left + "px";

  // top = 视频底部 + 4px 间距，紧挨视频
  host.style.top = (rect.bottom + window.scrollY + 4) + "px";
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

  if (!urls.length) return;

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
    // 带标题
    const copyBtn2 = document.createElement("button");
    copyBtn2.className = "sniffer-copy";
    copyBtn2.textContent = "复制2";
    copyBtn2.addEventListener("click", function () {
      copyToClipboard(document.title + "," + item.url, copyBtn2);
    });

    row.appendChild(copyBtn);
    row.appendChild(copyBtn2);

    list.appendChild(row);
  }

  if (1 == 1) {
    const copyTitleBtn = document.createElement("button");
    copyTitleBtn.className = "sniffer-copy";
    copyTitleBtn.textContent = "复制标题";
    copyTitleBtn.addEventListener("click", function () {
      copyToClipboard(document.title + ",", copyTitleBtn);
    });

    list.appendChild(copyTitleBtn);
  }

  if (urls.length > 1) {
    const copyAllRow = document.createElement("div");
    copyAllRow.className = "sniffer-copyall-row";
    const copyAllBtn = document.createElement("button");
    copyAllBtn.className = "sniffer-copy-all";
    copyAllBtn.textContent = "复制全部链接";
    copyAllBtn.addEventListener("click", function () {
      copyToClipboard(urls.map(u => u.url).join("\n"), copyAllBtn);
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

// ============ DOM 变化监听 ============

function startObserving() {
  if (observer) return;

  observer = new MutationObserver(function () {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      scanMediaElements();
      scanSourceTags();
      scanInlineScripts();
      if (m3u8Urls.length > 0) {
        showOrUpdateBar();
        reportToBackground();
      }
    }, 500);
  });

  observer.observe(document.body || document.documentElement, {
    childList: true,
    subtree: true,
  });

  // 滚动和窗口变化时重新定位 bar，让它始终贴在视频下方
  window.addEventListener("scroll", onLayoutChange, true);
  window.addEventListener("resize", onLayoutChange);
}

let layoutTimer = null;
function onLayoutChange() {
  if (layoutTimer) clearTimeout(layoutTimer);
  layoutTimer = setTimeout(() => {
    if (barInstance && barInstance.video) {
      positionBar(barInstance.video);
    }
  }, 100);
}

// ============ 初始化：页面加载完成后自动开始 ============

function init() {
  scanDOM();
  fetchNetworkUrls();
  startObserving();
  if (m3u8Urls.length > 0) showOrUpdateBar();
}

if (document.readyState === "complete" || document.readyState === "interactive") {
  init();
} else {
  window.addEventListener("DOMContentLoaded", init);
}
