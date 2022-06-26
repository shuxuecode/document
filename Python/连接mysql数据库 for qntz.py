# !/usr/bin/python3
# -*- coding:utf-8 -*-

import pymysql

# 打开数据库连接
db = pymysql.connect(
    host = 'proxyali',user = 'qntz',passwd = 'qntz',
    port = 3306,db = 'qntz',charset = 'utf8'
    #port必须写int类型
    #charset必须写utf8，不能写utf-8
)

print(db)


# 使用 cursor() 方法创建一个游标对象 cursor
cursor = db.cursor()
 
# 使用 execute()  方法执行 SQL 查询 
cursor.execute("SELECT * from t_article limit 0, 10")
 
# 使用 fetchone() 方法获取单条数据.
rows = cursor.fetchall()

# for row in rows:
#     print(row)
 
print(list(rows))
 
# 关闭数据库连接
db.close()

