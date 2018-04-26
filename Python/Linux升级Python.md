## centos


服务器默认配置安装python 2.6.6版本的，
所以需要把机器内原来的python2.6升级成2.7

1）下载2.7.8版本的python，很多人会说python3是未来的趋势，为啥不直接下python3,因为广大服务器安装都是2.x，用3的话，步子迈得有点大，会扯到蛋。

```
# wget http://python.org/ftp/python/2.7.8/Python-2.7.8.tgz 
```

2）编译 and 安装

```
# tar -zxvf Python-2.7.8.tar.bz2 


# cd Python-2.7.8

# ./configure --prefix=/usr/local/python27

# make && make install
```

3) 把原来2.6的python进行重命名，这一步是为了yum

```
# mv /usr/bin/python /usr/bin/python_old 
```

4）把2.7的python添加到linux的“快捷方式”

```
# ln -s /usr/local/python27/bin/python /usr/bin/
```

5）这个时间检查一下python

```
1234 Python 2.7.8 (default, Jul 16 2016, 10:38:06)  
[GCC 4.4.7 20120313 (Red Hat 4.4.7-17)] on linux2 
Type "help", "copyright", "credits" or "license" for more information. 
>>>

```