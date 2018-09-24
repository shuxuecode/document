---
utf-8编码可能2个字节、3个字节、4个字节的字符，但是MySQL的utf8编码只支持3字节的数据，而移动端的表情数据是4个字节的字符。如果直接往采用utf-8编码的数据库中插入表情数据，Java程序中将报SQL异常：

```
java.sql.SQLException: Incorrect string value: ‘\xF0\x9F\x92\x94’ for column ‘name’ at row 1
at com.mysql.jdbc.SQLError.createSQLException(SQLError.java:1073) 
at com.mysql.jdbc.MysqlIO.checkErrorPacket(MysqlIO.java:3593) 
at com.mysql.jdbc.MysqlIO.checkErrorPacket(MysqlIO.java:3525) 
at com.mysql.jdbc.MysqlIO.sendCommand(MysqlIO.java:1986) 
at com.mysql.jdbc.MysqlIO.sqlQueryDirect(MysqlIO.java:2140) 
at com.mysql.jdbc.ConnectionImpl.execSQL(ConnectionImpl.java:2620) 
at com.mysql.jdbc.StatementImpl.executeUpdate(StatementImpl.java:1662) 
at com.mysql.jdbc.StatementImpl.executeUpdate(StatementImpl.java:1581)
```

可以对4字节的字符进行编码存储，然后取出来的时候，再进行解码。但是这样做会使得任何使用该字符的地方都要进行编码与解码。

utf8mb4编码是utf8编码的超集，兼容utf8，并且能存储4字节的表情字符。 
采用utf8mb4编码的好处是：存储与获取数据的时候，不用再考虑表情字符的编码与解码问题。

更改数据库的编码为utf8mb4:

1. MySQL的版本
utf8mb4的最低mysql版本支持版本为5.5.3+，若不是，请升级到较新版本。

2. MySQL驱动
5.1.34可用,最低不能低于5.1.13

3.修改MySQL配置文件
修改mysql配置文件my.cnf（windows为my.ini） 
my.cnf一般在etc/mysql/my.cnf位置。找到后请在以下三部分里添加如下内容： 

```
[client] 
default-character-set = utf8mb4 
[mysql] 
default-character-set = utf8mb4 
[mysqld] 
character-set-client-handshake = FALSE 
character-set-server = utf8mb4 
collation-server = utf8mb4_unicode_ci 
init_connect='SET NAMES utf8mb4'
```


4. 重启数据库，检查变量
SHOW VARIABLES WHERE Variable_name LIKE 'character_set_%' OR Variable_name LIKE 'collation%';

Variable_name	Value
character_set_client	utf8mb4
character_set_connection	utf8mb4
character_set_database	utf8mb4
character_set_filesystem	binary
character_set_results	utf8mb4
character_set_server	utf8mb4
character_set_system	utf8
collation_connection	utf8mb4_unicode_ci
collation_database	utf8mb4_unicode_ci
collation_server	utf8mb4_unicode_ci
collation_connection 、collation_database 、collation_server是什么没关系。

但必须保证

系统变量	描述
character_set_client	(客户端来源数据使用的字符集)
character_set_connection	(连接层字符集)
character_set_database	(当前选中数据库的默认字符集)
character_set_results	(查询结果字符集)
character_set_server	(默认的内部操作字符集)
这几个变量必须是utf8mb4。

5. 数据库连接的配置
数据库连接参数中: 
characterEncoding=utf8会被自动识别为utf8mb4，也可以不加这个参数，会自动检测。 
而autoReconnect=true是必须加上的。

6. 将数据库和已经建好的表也转换成utf8mb4
更改数据库编码：ALTER DATABASE caitu99 CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

更改表编码：ALTER TABLE TABLE_NAME CONVERT TO CHARACTER SET utf8mb4 COLLATEutf8mb4_general_ci; 
如有必要，还可以更改列的编码