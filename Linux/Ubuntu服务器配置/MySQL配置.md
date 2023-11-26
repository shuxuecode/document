





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



