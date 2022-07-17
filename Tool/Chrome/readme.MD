
## 启动不安全模式进行开发调试

chrome.exe --disable-web-security --user-data-dir


## 删除浏览器记忆，防止http自动跳转https

地址栏输入

chrome://net-internals/#hsts

找到底部Delete domain security policies一栏，输入想处理的域名，点击delete


## 光标快速定位到地址栏-进行搜索
```
Windows: Ctrl + L 或 Alt + D 或 F6 
Mac: Command + L
Linux: Ctrl + L
```



---