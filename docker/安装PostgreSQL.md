apt-get install postgresql


```
Success. You can now start the database server using:

    /usr/lib/postgresql/9.6/bin/pg_ctl -D /var/lib/postgresql/9.6/main -l logfile start

Ver Cluster Port Status Owner    Data directory               Log file
9.6 main    5432 down   postgres /var/lib/postgresql/9.6/main /var/log/postgresql/postgresql-9.6-main.log
update-alternatives: using /usr/share/postgresql/9.6/man/man1/postmaster.1.gz to provide /usr/share/man/man1/postmaster.1.gz (postmaster.1.gz) in auto mode
invoke-rc.d: could not determine current runlevel
invoke-rc.d: policy-rc.d denied execution of start.
Setting up postgresql (9.6+184ubuntu1.1) ...
Setting up postgresql-contrib-9.6 (9.6.9-0ubuntu0.17.10) ...
Processing triggers for systemd (234-2ubuntu12.3) ...
Processing triggers for libc-bin (2.26-0ubuntu2.1) ...

```


安装完成后，默认会：

（1）创建名为"postgres"的Linux用户

（2）创建名为"postgres"、不带密码的默认数据库账号作为数据库管理员

（3）创建名为"postgres"的表


## 启动数据库

```
 /etc/init.d/postgresql start

 /etc/init.d/postgresql restart

 /etc/init.d/postgresql stop
```


切换到postgres用户

su postgres

输入psql

提示符变成： postgres=# 

```
在这里可用执行SQL语句和psql的基本命令。可用的基本命令如下：


\password：设置密码
\q：退出
\h：查看SQL命令的解释，比如\h select。
\?：查看psql命令列表。
\l：列出所有数据库。
\c [database_name]：连接其他数据库。
\d：列出当前数据库的所有表格。
\d [table_name]：列出某一张表格的结构。
\du：列出所有用户。
\e：打开文本编辑器。
\conninfo：列出当前数据库和连接的信息。
```


---

使用psql命令登录数据库的命令为：

psql -U dbuser -d exampledb -h 127.0.0.1 -p 5432
上面命令的参数含义如下：-U指定用户，-d指定数据库，-h指定服务器，-p指定端口。

输入上面命令以后，系统会提示输入dbuser用户的密码。

---

## 修改默认管理员账号的密码

```
postgres=# alter user postgres with password '123456';
```

这样，管理员"postgres"的密码就为"123456"。

退出psql客户端命令：\q

