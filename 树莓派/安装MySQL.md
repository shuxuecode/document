## 开始





### 查看是否已安装mysql

dpkg -l | grep mysql

### 卸载 apt-get remove mysql-server


### 安装 

apt-get install mysql-server

### 安装前要先升级包

apt-get update


安装过程中会提示输入root密码



## 修改root密码

mysql -uroot -p
输入密码

use mysql;

update user set password=PASSWORD('root') where user='root';

flush privileges;


## 开启远程访问

### 修改/etc/mysql/my.cnf文件
找到下面这行，并用#注释掉，
bind-address        = 127.0.0.1
或者修改为bind-address        = 0.0.0.0

### 登录mysql，输入下面命令

grant all privileges on *.* to root@"%" identified by "root";


flush privileges;

### 重启

1、 使用 service 启动：service mysqld restart

2、使用 mysqld 脚本启动：/etc/inint.d/mysqld restart


