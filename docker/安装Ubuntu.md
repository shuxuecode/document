## 拉取

 docker pull daocloud.io/library/ubuntu:16.10

## 启动

docker run --name u1 -t -i -p 60022:22 -p 8080:8080 -p 8081:8081 -p 8082:8082 -p 8083:8083 -p 8084:8084 daocloud.io/library/ubuntu:16.10 /bin/bash 

## 安装ssh

apt-get update

apt-get install openssh*

## 安装vi

apt-get install vim


## 修改root密码

passwd root

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
或者  sudo service ssh restart


## 使用传输文件的命令： rz  sz
需要安装：  apt-get install lrzsz

## 安装unzip

sudo apt-get install zip 或者 yum install -y unzip zip

## 




## 

2. 使用git连接github

使用git连接github时，需要将linux下产生的一个ssh公钥放到github上。
主要命令有：



ssh-keygen -t rsa -C"mail@mail.com" 


## 

cp -fr /root/.jenkins/workspace/demo /data/tomcat-8081/webapps/demo

/root/.jenkins/workspace/demo

/data/tomcat-8081/webapps


## 配置好环境后，可以提交容器到镜像

docker commit 8e036a632f14 jenkins-1




---

deb http://mirrors.163.com/ubuntu/ trusty main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ trusty-security main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ trusty-updates main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ trusty-proposed main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ trusty-backports main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ trusty main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ trusty-security main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ trusty-updates main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ trusty-proposed main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ trusty-backports main restricted universe multiverse


---

deb http://archive.ubuntu.com/ubuntu/ trusty main restricted universe multiverse 
deb http://archive.ubuntu.com/ubuntu/ trusty-security main restricted universe multiverse 
deb http://archive.ubuntu.com/ubuntu/ trusty-updates main restricted universe multiverse 
deb http://archive.ubuntu.com/ubuntu/ trusty-proposed main restricted universe multiverse 
deb http://archive.ubuntu.com/ubuntu/ trusty-backports main restricted universe multiverse 
deb-src http://archive.ubuntu.com/ubuntu/ trusty main restricted universe multiverse 
deb-src http://archive.ubuntu.com/ubuntu/ trusty-security main restricted universe multiverse 
deb-src http://archive.ubuntu.com/ubuntu/ trusty-updates main restricted universe multiverse 
deb-src http://archive.ubuntu.com/ubuntu/ trusty-proposed main restricted universe multiverse 
deb-src http://archive.ubuntu.com/ubuntu/ trusty-backports main restricted universe multiverse


