



## MySQL内容不区分大小写

数据库存储的varchar类型字符串查询时不区分大小写

简而言之: 通过 show variables like 'lower_case_table_names' 查看值, 0代表严格区分, 1代表不区分，

1、mysql对于类型为varchar数据默认不区分大小写，但如果该字段以“*_bin”编码的话会使mysql对其区分大小写。

2、mysql对于字段名的策略与varchar类型数据相同。即：默认不区分大小写，但如果该字段是以“*_bin”编码的话会使mysql对其区分大小写。

3、mysql对于表名的策略与varchar类型数据相同。即：默认不区分大小写，但如果该表是以“*_bin”编码的话会使mysql对其区分大小写。

通过修改mysql的配置my.cnf文件更改然后重启,即可达到预期的效果。

mysql配置文件的修改内容如下：
```
[mysqld]
lower_case_table_names = 1
```


## 查看当前线程执行情况

```SQL
show processlist;
```

- id 线程id
- User 执行sql的账号
- Host 执行sql的数据库的ip和端号
- db 数据库名称
- Command 执行命令，包括：Daemon、Query、Sleep等。
- Time 执行sql所消耗的时间
- State 执行状态
- info 执行信息，里面可能包含sql信息。

todo
