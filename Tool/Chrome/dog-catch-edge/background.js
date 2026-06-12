/**
 * M3U8 Sniffer - Background Service Worker
 * 网络请求拦截检测 m3u8 URL
 * 页面加载后自动检测，无需手动点击
 */

// m3u8 相关的 MIME 类型
const M3U8_TYPES = [
  "application/vnd.apple.mpegurl",
  "application/x-mpegurl",
  "application/mpegurl",
];

// m3u8 相关的文件扩展名
const M3U8_EXTENSIONS = ["m3u8", "m3u"];

// 存储每个 tab 检测到的 m3u8 URL（去重）
const tabM3U8Map = {};

// ============ 检测函数 ============

function isM3U8Url(url) {
  try {
    const pathname = new URL(url).pathname.toLowerCase();
    const ext = pathname.split(".").pop();
    return M3U8_EXTENSIONS.includes(ext);
  } catch {
    return false;
  }
}

function isM3U8Type(contentType) {
  if (!contentType) return false;
  const lower = contentType.toLowerCase().split(";")[0].trim();
  return M3U8_TYPES.some(t => lower === t);
}

// 检查 URL 参数中是否有明确的 m3u8 格式标识（只匹配已知参数名）
function hasM3U8Param(url) {
  try {
    const urlObj = new URL(url);
    for (const [key, value] of urlObj.searchParams.entries()) {
      const k = key.toLowerCase();
      const v = value.toLowerCase();
      if ((k === "format" || k === "type" || k === "src" || k === "source") &&
          (v === "m3u8" || v === "m3u")) {
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}

// 添加 m3u8 URL 到 tab 记录并通知 content script
function addM3U8(tabId, url) {
  if (!tabM3U8Map[tabId]) {
    tabM3U8Map[tabId] = [];
  }
  if (tabM3U8Map[tabId].some(item => item.url === url)) {
    return;
  }
  tabM3U8Map[tabId].push({ url, timestamp: Date.now() });

  // 通知 content script 展示
  try {
    chrome.tabs.sendMessage(tabId, {
      type: "m3u8_found",
      url: url,
      count: tabM3U8Map[tabId].length,
    });
  } catch {}
}

// ============ 网络请求监听（始终激活） ============

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    const { url, tabId } = details;
    if (tabId < 0) return;
    if (isM3U8Url(url) || hasM3U8Param(url)) {
      addM3U8(tabId, url);
    }
  },
  { urls: ["<all_urls>"] }
);

chrome.webRequest.onResponseStarted.addListener(
  function (details) {
    const { url, tabId, responseHeaders } = details;
    if (tabId < 0) return;

    if (isM3U8Url(url) || hasM3U8Param(url)) {
      addM3U8(tabId, url);
      return;
    }

    if (responseHeaders) {
      for (const header of responseHeaders) {
        if (header.name.toLowerCase() === "content-type") {
          if (isM3U8Type(header.value)) {
            addM3U8(tabId, url);
            return;
          }
          break;
        }
      }
    }
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);

// ============ tab 生命周期 ============

// 页面导航 → 清空旧数据
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  if (changeInfo.status === "loading") {
    tabM3U8Map[tabId] = [];
    try {
      chrome.tabs.sendMessage(tabId, { type: "m3u8_clear" });
    } catch {}
  }
});

// tab 关闭 → 清理
chrome.tabs.onRemoved.addListener(function (tabId) {
  delete tabM3U8Map[tabId];
});

// ============ content script 请求 ============

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // content script 上报从 DOM 扫描到的 m3u8 URL
  if (message.type === "add_m3u8") {
    const tabId = sender.tab?.id;
    if (tabId && message.url) {
      addM3U8(tabId, message.url);
    }
    sendResponse({ ok: true });
    return true;
  }

  // content script 请求当前 tab 已有的 m3u8 列表
  if (message.type === "get_m3u8_list") {
    const tabId = sender.tab?.id;
    if (tabId && tabM3U8Map[tabId]) {
      sendResponse({ urls: tabM3U8Map[tabId] });
    } else {
      sendResponse({ urls: [] });
    }
    return true;
  }
});
