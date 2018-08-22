查看MySQL连接数和当前用户Mysql连接数


先用管理员身份进入mysql提示符。
#mysql -uroot -pxxxx
mysql> show processlist; 可以显示前100条连接信息 show full processlist; 可以显示全部。随便说下，如果用普通账号登录，就只显示这用户的。注意命令后有分号。

如果我们想查看这台服务器设置。 #vi /etc/my.cnf
set-variable=max_user_connections=30 这个就是单用户的连接数
set-variable=max_connections=800 这个是全局的限制连接数





---


导出数据库

第一个test是数据库名称

D:\ProgramFiles\mysql-5.6.36\bin\mysqldump.exe -u root -p test > D:\test.sql
回车后会提示输入密码，才能继续下去