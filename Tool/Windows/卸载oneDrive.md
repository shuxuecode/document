1、禁止onedrive自启动

在任务管理器的启动中禁用onedrive的启动项目就可以

2、删除onedrive的程序卸载

强制删除。直接通过取得权限的方式来删除%localappdata%\Microsoft\onedrive文件夹（取得权限以后，可能需要先在进程中关闭掉相应的onedrive进程，才能把文件夹删除干净）

c:\Users\{uname}\AppData\Local|Mic...

3、删除导航栏中的onedrive

卸载onedrive是不能清除导航栏里面的onedrive，进入注册表：（win+R > regedit）
HKEY_CLASSES_ROOT\CLSID\{018D5C66-4533-4307-9B53-224DE2ED1FE6}\ShellFolder
把右侧的Attributes属性的值 f080004d修改为f090004d。（数字8改成9即可）
任务管理器中重启资源管理器后就生效了。
