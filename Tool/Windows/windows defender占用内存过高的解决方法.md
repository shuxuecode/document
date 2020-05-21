

# Antimalware Service Executable是win10内置杀毒软件windows defender的一个进程。一般情况是刚开机是系统运行杀毒程序 这个进程占用cpu高，过一会就没事了。

如果觉得它占用cpu太高可以通过设置来关闭它。关闭它有两种方法，一种是关闭启动进程扫描。另一种是关闭windows defende。

- 在运行里输入：gpedit.msc 
- 依次打开：计算机配置----管理模板----windows组件----windows Defender----实时保护
- 鼠标双击右侧的“不论何时启用实时保护，都会启用进程扫描”，在弹出的设置页面选已禁用。保存就行了。

## 如果还不能解决我们可以用第二种方法就是禁用windows Defender。

我们用上面的方法依次打开：管理模板----windows组件--找到-windows Defender，鼠标点一下windows Defender。在右侧找到”关闭windows Defender"并用鼠标双击它
在打开的设置页面，选：已启用。确定之后就会禁用windows Defender。




---


## 查看运行多久

(get-date) - (gcim Win32_OperatingSystem).LastBootUpTime


---