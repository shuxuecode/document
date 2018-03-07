
## 执行安装命令

```
apt-get update
apt-get install mysql-server
```

在安装过程中会提示创建root密码，务必记牢。

## 验证是否成功

安装成功后可以通过下面的命令测试是否安装成功：

```
sudo netstat -tap | grep mysql
```

出现以下信息表示成功

```
tcp        0      0 localhost:mysql         *:*                     LISTEN      7044/mysqld
```

## 远程访问

现在设置mysql允许远程访问，
首先编辑文件/etc/mysql/mysql.conf.d/mysqld.cnf：

```
sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
```

> 注释掉bind-address = 127.0.0.1：
　　

保存退出，然后进入mysql服务，执行授权命令：

```
grant all on *.* to root@'%' identified by '你的密码' with grant option;
flush privileges;
```

然后执行quit命令退出mysql服务，执行如下命令重启mysql：

```
service mysql restart
```

现在可以使用navicat远程连接mysql服务。



## 5.7版本 修改密码


```
update mysql.user set authentication_string=password('123qwe') where user='root';
```

5.7以前
```
update user set password=PASSWORD('root!') where user = 'root';
```




































---
