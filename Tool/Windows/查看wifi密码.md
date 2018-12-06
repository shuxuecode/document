### Win10系统自带的查看WiFi密码的方法

- 用系统管理员权限来运行CMD


- 接着输入以下代码：

```
Netsh wlan show profile name=”热点名字” key=clear
```

其中，“热点名字”就填写你想要查看密码的WiFi热点的名称，例如笔者想要查看“staff”这个热点的密码，则输入：

```
Netsh wlan show profile name=”staff” key=clear
```

