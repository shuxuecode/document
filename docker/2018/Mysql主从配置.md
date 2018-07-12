docker run --name mysql1 -t -i -p 60027:22 -p 43306:3306 debian:9 /bin/bash 


apt-get update

apt-get install mysql-server

apt-get install vim


开启MySQL服务

sudo service mysql start
关闭服务

sudo service mysql stop
重启服务

sudo service mysql restart
尝试登陆

mysql -u root -p
输入密码即可登陆到mysql


在主数据库上创建同步账号。

GRANT REPLICATION SLAVE,FILE ON *.* TO 'mstest'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;

GRANT REPLICATION SLAVE,FILE ON *.* TO 'mstest'@'172.17.0.2' IDENTIFIED BY '123456' WITH GRANT OPTION;

FLUSH PRIVILEGES;


select host,user from user;

```
[mysqld]

bind-address=0.0.0.0
port=3306

skip-name-resolve

server-id=1
log-bin=log
sync-binlog=1
```

docker commit faf5399c7539 debian:mysql

docker run --name mysql2 -t -i -p 60028:22 -p 53306:3306 debian:mysql /bin/bash 


 mysql -h 172.17.0.3 -P 3306 -udemo -p123456












grant replication slave on *.* to 'mark'@'172.17.0.2' identified by '123456';




service mysqld restart

mysql -uroot -p
mysql> change master to  master_host='172.17.0.3', master_user='mark' ,master_password='123456', master_log_file='log.000004' ,master_log_pos=502;
mysql> start slave;  ##开启从库   (stop slave：关闭从库）
mysql> show slave status; ###Slave_IO_Running,Slave_SQL_Running 都为Yes的时候表示配置成功 