/**
 * M3U8 Sniffer - Background Service Worker
 * 基于 cat-catch 的网络请求拦截逻辑，检测 m3u8 URL
 * 用户点击插件图标后才激活检测
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

// 已激活检测的 tab 集合 —— 只有用户点击图标后才会加入
const activeTabs = new Set();

// ============ 检测函数 ============

// 检查 URL 扩展名是否为 m3u8
function isM3U8Url(url) {
  try {
    const pathname = new URL(url).pathname.toLowerCase();
    const ext = pathname.split(".").pop();
    return M3U8_EXTENSIONS.includes(ext);
  } catch {
    return false;
  }
}

// 检查 Content-Type 是否为 m3u8 类型
function isM3U8Type(contentType) {
  if (!contentType) return false;
  const lower = contentType.toLowerCase().split(";")[0].trim();
  return M3U8_TYPES.some(t => lower === t);
}

// 检查 URL 参数中是否包含 m3u8 格式标识
function hasM3U8Param(url) {
  try {
    const urlObj = new URL(url);
    for (const [key, value] of urlObj.searchParams.entries()) {
      const k = key.toLowerCase();
      const v = value.toLowerCase();
      if (k.includes("m3u8") || v.includes("m3u8") ||
          (k === "format" && v === "m3u8") ||
          (k === "type" && v.includes("m3u"))) {
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}

// 添加 m3u8 URL 到 tab 记录（仅在 tab 激活时处理）
function addM3U8(tabId, url) {
  // 只有激活的 tab 才记录和转发
  if (!activeTabs.has(tabId)) return;

  if (!tabM3U8Map[tabId]) {
    tabM3U8Map[tabId] = [];
  }
  // 去重
  if (tabM3U8Map[tabId].some(item => item.url === url)) {
    return;
  }
  tabM3U8Map[tabId].push({ url, timestamp: Date.now() });

  // 通知 content script
  try {
    chrome.tabs.sendMessage(tabId, {
      type: "m3u8_found",
      url: url,
      count: tabM3U8Map[tabId].length,
    });
  } catch {}
}

// ============ 网络请求监听（MV3 要求始终注册，但只在激活 tab 时处理） ============

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    const { url, tabId } = details;
    if (tabId < 0) return;
    if (isM3U8Url(url)) {
      addM3U8(tabId, url);
      return;
    }
    if (hasM3U8Param(url)) {
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

// ============ 点击插件图标 → 激活检测 ============

chrome.action.onClicked.addListener(function (tab) {
  const tabId = tab.id;

  // 激活该 tab 的检测
  activeTabs.add(tabId);
  tabM3U8Map[tabId] = [];

  // 通知 content script 开始工作
  try {
    chrome.tabs.sendMessage(tabId, { type: "start_sniff" });
  } catch {}
});

// ============ tab 生命周期管理 ============

// 页面导航时：如果已激活则重置数据，通知 content script 重新开始
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  if (changeInfo.status === "loading" && activeTabs.has(tabId)) {
    tabM3U8Map[tabId] = [];
    try {
      chrome.tabs.sendMessage(tabId, { type: "m3u8_clear" });
    } catch {}
  }
});

// tab 关闭时：清理数据，移除激活状态
chrome.tabs.onRemoved.addListener(function (tabId) {
  activeTabs.delete(tabId);
  delete tabM3U8Map[tabId];
});

// ============ content script 请求 ============

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
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
