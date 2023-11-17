




### 创建数据库

```
CREATE DATABASE IF NOT EXISTS 数据库名 CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
```

### 创建用户

```
CREATE USER '用户名'@'%' IDENTIFIED BY '密码';
```

### 给用户分配库权限
```
grant all privileges on 库名.* to '用户名'@'%';
flush privileges;
```

### 建表
```SQL

```



