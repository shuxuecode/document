





### 创建数据库

```
CREATE DATABASE IF NOT EXISTS 数据库名 CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
CREATE DATABASE IF NOT EXISTS 数据库名 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 创建用户

```
CREATE USER '用户名'@'%' IDENTIFIED BY '密码';
CREATE user 'root'@'%' identified with mysql_native_password by '123456';
```

### 给用户分配库权限
```
grant all privileges on 库名.* to '用户名'@'%';
flush privileges;

mysql> GRANT ALL PRIVILEGES ON *.* TO 'USERNAME'@'ip' IDENTIFIED BY 'PASSWORD' WITH GRANT OPTION;

```


### 建表
示例
```SQL
CREATE TABLE `t_wx_user` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `open_id` varchar(50)  NOT NULL DEFAULT '' COMMENT 'openid',
  `nick_name` varchar(50)  NOT NULL DEFAULT '' COMMENT '昵称',
  `avatar_url` varchar(200)  NOT NULL DEFAULT '' COMMENT '头像图片地址',
  `country` varchar(50)  NOT NULL DEFAULT '' COMMENT '国家',
  `province` varchar(50)  NOT NULL DEFAULT '' COMMENT '省份',
  `city` varchar(50)  NOT NULL DEFAULT '' COMMENT '城市',
  `language` varchar(50)  NOT NULL DEFAULT '' COMMENT '语言',
  `gender` int NOT NULL DEFAULT '0' COMMENT '性别',
  `del` int NOT NULL DEFAULT '0' COMMENT '是否删除，0否，1是',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `creator_id` varchar(20)  NOT NULL DEFAULT '' COMMENT '创建人id',
  `creator_name` varchar(25)  NOT NULL DEFAULT '' COMMENT '创建人名称',
  `updater_id` varchar(20)  NOT NULL DEFAULT '' COMMENT '更新人id',
  `updater_name` varchar(25)  NOT NULL DEFAULT '' COMMENT '更新人名称',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_open_id` (`open_id`) USING BTREE COMMENT 'openid唯一键'
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='小程序用户信息表';

```


### 创建索引

```SQL
CREATE INDEX index_name ON table_name (column1, column2, ...);
```



---
---
---

## 卸载MySQL

### 关闭MySQL服务
systemctl stop mysql
service mysql stop

### 卸载相关的依赖
sudo apt remove --purge mysql-*
sudo apt autoremove

### 清理残余文件
查询是否还存在相关的依赖组件：
dpkg --list | grep mysql

根据剩余的包执行卸载命令


## Ubuntu22安装MySQL5.7

### 选择版本
进入MySQL官方的Community Server选择历史版本：https://downloads.mysql.com/archives/community/


### 下载tar包
可以使用wget命令链接下载地址

wget https://downloads.mysql.com/archives/get/p/23/file/mysql-server_5.7.36-1ubuntu18.04_amd64.deb-bundle.tar
在目录下解压tar包

tar xvf ./mysql-server_5.7.36-1ubuntu18.04_amd64.deb-bundle.tar
解压后目录



### 安装
安装依赖lib包

sudo apt-get install ./libmysql*
sudo apt-get install libtinfo5
安装客户端和服务端，按提示可能要先安装community版本

sudo apt-get install ./mysql-community-client_5.7.36-1ubuntu18.04_amd64.deb
sudo apt-get install ./mysql-client_5.7.36-1ubuntu18.04_amd64.deb
sudo apt-get install ./mysql-community-server_5.7.36-1ubuntu18.04_amd64.deb
sudo apt-get install ./mysql-server_5.7.36-1ubuntu18.04_amd64.deb 
过程中会提示设置MySQL的密码，用户名默认root





