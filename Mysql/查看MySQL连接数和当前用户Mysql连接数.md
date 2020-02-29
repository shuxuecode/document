
## 查看连接数

```
show processlist;
show full processlist;

例如：
#mysql -uroot -pxxxx
mysql> show processlist;

```

## 查询数据库当前设置的最大连接数  

```
mysql> show variables like '%max_connections%';
```    

## 修改连接数

在/etc/my.cnf里面设置数据库的最大连接数  
max_connections = 1000  
```
#vi /etc/my.cnf
max_user_connections=30 最大用户连接数
max_connections=800 最大连接数  
```



---


�������ݿ�

��һ��test�����ݿ�����

D:\ProgramFiles\mysql-5.6.36\bin\mysqldump.exe -u root -p test > D:\test.sql
�س������ʾ�������룬���ܼ�����ȥ



----

查询版本信息的SQL语句
select version();