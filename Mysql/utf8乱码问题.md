
## 命令行查看编码

```
show variables like 'char%';
```

## 修改配置文件  my.ini  my.cnf (路径一般在：/etc/my.cnf    搜索： find / -name my.cnf   )

```
[mysql]
default-character-set=utf8


[mysqld]
character_set_server=utf8


[client]
default-character-set=utf8

```




## 重启mysql

```
service mysqld restart
```



















































































































































---