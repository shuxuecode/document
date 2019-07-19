
```
show variables like 'log_bin';
```

没有开启log_bin的值是OFF,开启之后是ON

更多信息执行命令：

```
show variables like 'log_%';   
```


修改配置文件my.ini

```
# binlog设置
log-bin=D:\ProgramFiles\mysql-8.0.15-winx64\logs\mysql-bin.log
expire-logs-days=14
max-binlog-size=500M
server-id=1
```


其它配置  待验证

```
log-bin=mysql-bin
binlog-format=Row
```

重启Mysql服务

net stop mysql
net start mysql

先停止，再启动，（**需要以管理员运行cmd**）















---