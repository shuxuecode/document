# GitHub Note - Chrome 浏览器扩展

基于 GitHub 仓库的在线笔记工具，支持文件的增删改查、分支管理和 Markdown 预览。

## 功能特性

- 📥 **Pull** - 从 GitHub 仓库拉取文件内容
- 📤 **Push** - 将编辑内容推送到 GitHub 仓库
- ➕ **AddFile** - 在仓库中创建新文件
- 🗑️ **DeleteFile** - 删除仓库中的文件
- ✏️ **重命名文件** - 通过创建新文件+删除旧文件实现
- 📁 **文件浏览** - 浏览仓库目录结构，展开目录，打开文件
- 🌿 **分支管理** - 获取分支列表、切换分支、创建新分支
- 🔍 **Markdown 预览** - 实时 Markdown 渲染预览
- 💾 **配置持久化** - 使用 chrome.storage 保存配置

## 安装方法

1. 下载或克隆本仓库到本地
2. 打开 Chrome 浏览器，访问 `chrome://extensions/`
3. 开启右上角的「开发者模式」
4. 点击「加载已解压的扩展程序」
5. 选择 `github-note` 文件夹

## 使用方法

1. 点击浏览器工具栏中的扩展图标，弹出浮窗
2. 设置 GitHub Token（需要 repo 权限的 Personal Access Token）
3. 设置 Owner（仓库所有者）和 Repo（仓库名称）
4. 可选设置 Branch（分支）和 FilePath（文件路径）
5. 点击 Pull 拉取文件内容，编辑后点击 Push 推送

## 项目结构

```
github-note/
├── manifest.json          # 扩展配置（Manifest V3）
├── popup.html             # 弹出浮窗页面
├── popup.js               # 核心业务逻辑
├── popup.css              # 页面样式
├── utils.js               # 工具函数（Base64、Markdown 渲染）
├── js/
│   ├── jquery.min.js      # jQuery 库
│   ├── octokat.js         # GitHub API 客户端
│   └── toastr.min.js      # 通知提示库
├── css/
│   └── toastr.min.css     # toastr 样式
├── icons/                 # 扩展图标（16/48/128 px）
└── README.md
```

## 权限说明

- `storage` - 持久化保存 GitHub 配置信息

## 技术说明

- 使用 Octokat.js 作为 GitHub API 客户端
- 使用 chrome.storage.local 替代 localStorage 持久化配置
- 内置轻量级 Markdown 渲染器，支持标题、粗体、斜体、链接、代码块、列表等
- 使用 toastr 进行操作反馈提示

## License

MIT
