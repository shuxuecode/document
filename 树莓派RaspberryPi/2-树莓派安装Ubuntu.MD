

## 下载镜像

访问https://ubuntu.com/download/raspberry-pi 下载64位系统镜像




# 写入

TF卡格式化为FAT格式

> 如果是重装系统的话，tf卡只有几十MB，需要使用分区助手把tf卡`删除所有分区`，然后再`创建分区`

## 使用Win32DiskImager安装系统

- 启动Win32DiskImager
- Image File处选择Raspbian映像文件
- Device处选择盘符为你读卡器的盘符
- 点Write，然后点一下Yes确定操作，开始系统写入
- 写入完成，提示成功 

 
最后，Micro SD卡插入树莓派，接通电源启动


## 第一次登陆

ssh ubuntu@ip

根据提示修改密码，修改完后重新登录


登录成功后，会提示如下：
---
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.
---


---

## 连接wifi

安装wifi扫描工具

sudo apt install wireless-tools


todo

