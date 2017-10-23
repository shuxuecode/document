
## 启动tomcat

docker run -p 8899:8080 daocloud.io/daocloud/dao-tomcat:v7.0.55

## 查看日志

docker logs [容器ID或者name]

## 停止

docker stop 容器ID或者name


## 进入容器中

docker exec -t -i 8d418a7b6021 /bin/bash

# docker exec -t -i dev_tomcat /bin/bash
// docker exec意思是：在dev_tomcat下面运行一个命令，在这里，运行的是/bin/bash
// -t 表示分配一个pseudo-TTY，-i 表示可交互
// 运行之后，提示符就变成了，tomcat这个image的默认工作目录是/usr/local/tomcat，自动打开：
root@94e167c8b2b8:/usr/local/tomcat#


## 从容器内拷贝文件到主机上

docker cp 8d418a7b6021:/var/lib/postgresql/data /opt/soft/

docker cp 容器id/name:/文件路径 /主机文件路径

## 从主机上拷贝文件到容器内
1.用-v挂载主机数据卷到容器内
通过-v参数，冒号前为宿主机目录，必须为绝对路径，冒号后为镜像内挂载的路径。
[root@oegw1 soft]# docker run -it -v /opt/soft:/mnt postgres /bin/bash
这种方式的缺点是只能在容器刚刚启动的情况下进行挂载


### docker可以支持把一个宿主机上的目录挂载到镜像里。

docker run -it -v /home/dock/Downloads:/usr/Downloads ubuntu64 /bin/bash
通过-v参数，冒号前为宿主机目录，必须为绝对路径，冒号后为镜像内挂载的路径。

docker run -p 8899:8080 -it -v d:/data/tomcat:/tomcat/webapps 4d9db337b0df[images的id] /bin/bash

比如上面这个命令， 我把.war包放到d:/data/tomcat下它会自动解压，然后直接访问8899/[war包名]即可成功




