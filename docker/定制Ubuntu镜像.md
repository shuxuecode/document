## 拉取

 docker pull ubuntu:17.10

## 启动

docker run --name u1 -t -i -p 60022:22 -p 8080:8080 ubuntu:17.10 /bin/bash

## 升级

apt-get update

## 安装ssh

apt-get install openssh*

## 修改root密码

passwd root

## 安装vi

apt-get install vim

## 设置root用户可以ssh远程连接

- 修改 /etc/ssh/sshd_config :

vi /etc/ssh/sshd_config

- 注释掉 #PermitRootLogin without-password，添加 PermitRootLogin yes

# Authentication:
LoginGraceTime 120
#PermitRootLogin without-password
PermitRootLogin yes
StrictModes yes

- 重启 ssh  服务

service ssh restart

## 使用传输文件的命令： rz  sz
需要安装：  apt-get install lrzsz



#  保存对容器的修改（commit）

docker ps -a

找到容器的id

docker commit 7253e2e01b4f zhaoubuntu

这样在docker images 时会发现zhaoubuntu的镜像
