## 	方法一：通过mysql命令行模式下动态修改

- 1.1 查看mysql当前时间，当前时区

```
> select curtime();  #或select now()也可以
+-----------+
| curtime() |
+-----------+
| 15:18:10 |
+-----------+
> show variables like "%time_zone%";
+------------------+--------+
| Variable_name  | Value |
+------------------+--------+
| system_time_zone | CST  |
| time_zone    | SYSTEM |
+------------------+--------+
2 rows in set (0.00 sec)
#time_zone说明mysql使用system的时区，system_time_zone说明system使用CST时区

```

- 1.2 修改时区

```
> set global time_zone = '+8:00'; ##修改mysql全局时区为北京时间，即我们所在的东8区
> set time_zone = '+8:00'; ##修改当前会话时区
> flush privileges; #立即生效
```

## 方法二：通过修改my.cnf配置文件来修改时区

```

# vim /etc/my.cnf ##在[mysqld]区域中加上
default-time_zone = '+8:00'
# /etc/init.d/mysqld restart ##重启mysql使新时区生效

```

## 方法三：如果不方便重启mysql，又想临时解决时区问题，可以通过php或其他语言在初始化mysql时初始化mysql时区


这里，以php为例，在mysql_connect()下使用:

```
mysql_query("SET time_zone = '+8:00'")
```
这样可以在保证你不重启的情况下改变时区。但是mysql的某些系统函数还是不能用如：now()。


> 本文为转载
> 原文链接： http://www.jb51.net/article/84198.htm

