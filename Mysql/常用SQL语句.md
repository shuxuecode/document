


## 表格增加字段


```sql
alter table `t_user`
add `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间';
```


## 修改索引
```SQL
ALTER TABLE `table_name`
	DROP KEY `idx_user_id_type`,
	ADD KEY `idx_user_id_type_status` (`user_id`,`type`,`status`);
```

