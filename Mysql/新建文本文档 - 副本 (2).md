## MySql版本问题sql_mode=only_full_group_by的完美解决方案

### 1、查看sql_mode
```
select @@sql_mode
```

查询出来的值为：
```
ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```

### 2、去掉ONLY_FULL_GROUP_BY，重新设置值。

```
set @@sql_mode ='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER
,NO_ENGINE_SUBSTITUTION';
```

### 3、上面是改变了全局sql_mode，对于新建的数据库有效。对于已存在的数据库，则需要在对应的数据下执行：

```
set sql_mode ='
STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER
,NO_ENGINE_SUBSTITUTION'
```



















