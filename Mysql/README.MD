



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


## group_concat函数

group_concat函数，实现分组查询之后的数据进行合并，并返回一个字符串结果。
group_concat()函数用于将多个字符串拼接成一个字符串。而MySql默认的最大拼接长度为1024个字节，一般情况下是够用的，但如果数据量特别大，就会存在java层返回内容被截断的问题，这时，为了保证拼接数据的完整性，就需要手工修改配置文件的group_concat_max_len属性值了。

```sql
group_concat（ [distinct] 要连接的字段 [order by 排序字段 asc/desc ] [separator ‘分隔符’] ）
```

