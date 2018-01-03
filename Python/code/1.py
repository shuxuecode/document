# -*- coding: utf-8 -*-

print('Hello World!!!')

print('中文测试')

# python保留字

import keyword
keys = keyword.kwlist
print(keys)

'''
多行注释 用三个' 或者 三个"
'''

# Python 通常是一行写完一条语句，但如果语句很长，我们可以使用反斜杠(\)来实现多行语句
if 1== \
 1:
    print(1)
else:
    print(2)

# 在 [], {}, 或 () 中的多行语句，不需要使用反斜杠(\)

import sys
type = sys.getfilesystemencoding()

print(type)


# 自然字符串， 通过在字符串前加r或R。 如 r"this is a line with \n" 则\n会显示，并不是换行
str = "this is test string \nthis second string "
print(str)
str = r"this is test string \nthis second string "
print(str)


# 使用三引号('''或""")可以指定一个多行字符串

str = """
非常棒，
第二行，第
三行
，第四行
"""
print(str)


# Python可以在同一行中使用多条语句，语句之间使用分号(;)分割
x='ceshi'; print(x)

# print 默认输出是换行的，如果要实现不换行需要在变量末尾加上 end=""
print("a", end='')
print("b", end='')
print("c", end='')
print()


import sys
sysPath = sys.path
print(sysPath)








































































































# end
