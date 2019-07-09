# -*- coding: utf-8 -*-


import os
import re

os.chdir('D:\\迅雷下载')

path = os.getcwd()

print(path)

files = os.listdir(path)

print(files)

# 被替换的字符串
str1 = '阳光电影www.ygdy8.com'
str2 = ''

reg = re.compile(str1)

for file in files:
    print(file)
    # print(os.path.isfile(file))
    if os.path.isfile(file):
        print(file + "  是文件")
        if str1 in file:
            print(file + ' 包含 ' + str1)
            newName = reg.sub(str2, file)
            os.rename(file, newName)
    print('---')


# os.path.isfile(path):

print(1)


# os.rename('','')



# print('a' in 'abc')
