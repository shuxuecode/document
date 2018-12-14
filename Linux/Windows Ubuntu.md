## 忘记用户密码怎么办


```
在C盘搜索'shadow'这个文件名，可能会搜出来'shadow-'这个文件名，位置是在C:\%userprofile%\AppData\Local\lxss\rootfs\etc这个目录下面，打开这个目录就能够看到'shadow'就在'shadow-'的旁边，用文本编辑器打开可以看到所有的用户和加密显示的密码。后面我用的方法是把个人登录用户名(username)的密码部分删除，然后保存退出。
```

```
启动powershell命令行

PS C:\Users\Administrator>

输入bash进入ubuntu子系统

PS C:\Users\Administrator> bash
username@localmachine:/mnt/c/Users/Administrator$

这时默认登录用户应该就是删除了密码的那个用户名，然后输入passwd

username@localmachine:/mnt/c/Users/Administrator$passwd

就可以重新输入密码了。
```