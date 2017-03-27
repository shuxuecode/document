
## 安装python

## 安装pip

在网上下载pip源码包，解压到某个目录，进入该目录，
执行： python setup.py install

## 安装Django

下载源码包，django-x.x.x.tar.gz

解压到目录，进入该目录，
执行： python setup.py install

- 检查是否安装成功

> python
> import django
> django.VERSION
> django.get_version()


## 开始



- django-admin.py startproject zsx-project

> 新建项目

在windows上是django-admin.exe，注意要把python安装目录下的Scripts目录也要添加到环境变量path里。

- python manage.py runserver 9999

> 启动

