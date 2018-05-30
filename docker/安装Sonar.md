## 拉取

 docker pull ubuntu:16.04

## 启动

docker run --name ubuntuFF -t -i -p 60025:22 ubuntu:16.04 /bin/bash

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

## 安装依赖库

apt-get install build-essential git-core checkinstall yasm texi2html
apt-get install libvorbis-dev libx11-dev libvpx-dev libxfixes-dev zlib1g-dev pkg-config
apt-get install netcat libncurses5-dev

## 解压安装包

 tar -xjf ffmpeg-4.0.tar.bz2

## 编译

./configure --enable-version3 --enable-postproc --enable-libvorbis --enable-libvpx


make

> 耐心等待



checkinstall --pkgname=ffmpeg --pkgversion="5:4.0" --backup=no --deldoc=yes --default


执行到这里安装完成

验证

ffmpeg -version

```
ffmpeg -version
ffmpeg version 4.0 Copyright (c) 2000-2018 the FFmpeg developers
built with gcc 5.4.0 (Ubuntu 5.4.0-6ubuntu1~16.04.4) 20160609
configuration: --enable-version3 --enable-postproc --enable-libvorbis --enable-libvpx
libavutil      56. 14.100 / 56. 14.100
libavcodec     58. 18.100 / 58. 18.100
libavformat    58. 12.100 / 58. 12.100
libavdevice    58.  3.100 / 58.  3.100
libavfilter     7. 16.100 /  7. 16.100
libswscale      5.  1.100 /  5.  1.100
libswresample   3.  1.100 /  3.  1.100
```

---
