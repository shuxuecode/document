# !/usr/bin/python3
# -*- coding:utf-8 -*-

import pymysql

# 打开数据库连接
db = pymysql.connect(
    host = '127.0.0.1',user = 'root',passwd = 'root',
    port = 3306,db = 'mysql',charset = 'utf8'
    #port必须写int类型
    #charset必须写utf8，不能写utf-8
)

print(db)


# 使用 cursor() 方法创建一个游标对象 cursor
cursor = db.cursor()
 
# 使用 execute()  方法执行 SQL 查询 
cursor.execute("SELECT VERSION()")
 
# 使用 fetchone() 方法获取单条数据.
data = cursor.fetchone()
 
print ("Database version : %s " % data)
 
# 关闭数据库连接
db.close()

