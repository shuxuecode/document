## 

docker pull daocloud.io/library/centos:7


## 

docker run --name centos7 -t -i -p 60022:22 daocloud.io/library/centos:7 /bin/bash 

然后  docker start centos7 来启动

## 安装ssh


yum install openssh-server -y  或者  yum install openssh*   （注意星号*）

## 

### 添加一个用户组mygroup  ( groupdel peter  删除组)
groupadd mygroup

### 然后，添加一个新的用户

useradd -d /home/admin -s /bin/bash -m admin

上面命令中，参数d表示指定用户的主目录，参数s指定用户的shell，参数m表示如果该目录不存在，则创建该目录。


### 设置新用户的密码。

	passwd admin

将admin添加到用户组mygroup中

	usermod -a -G mygroup admin

为admin用户设定sudo权限

	vi /etc/sudoers

命令会打开文件/etc/sudoers，找到如下一行

	root    ALL=(ALL) ALL

添加一行

	admin   ALL=(ALL) NOPASSWD: ALL

上面的NOPASSWD表示，切换sudo的时候，不需要输入密码，我喜欢这样比较省事。如果出于安全考虑，也可以强制要求输入密码。

另开一个终端，以admin用户登录，检查是否设置成功



### 

修改

vi /etc/ssh/sshd_config


---
修改如下设置并确保去除了#号

在配置文件中找到 #Port 22，修改默认的端口，范围可以从1025到65536

Port 22


Protocol 2  启用SSH版本2协议

#禁止root用户登录

PermitRootLogin no


#禁止使用密码登录

PasswordAuthentication no
PermitEmptyPasswords no
PasswordAuthentication yes

最后，在配置文件的末尾添加一行用来指定可以登录的用户

AllowUsers admin


###

3. 輸入    sudo systemctl restart sshd.service    重新啟動



4. 輸入    sudo systemctl enable sshd.service    設定開機啟動







---

https://hub.docker.com/r/bestwu/ewomail/

docker pull bestwu/ewomail

docker run  -d -h mail.edu.funimg.top --restart=always   -p 25:25   -p 109:109   -p 110:110   -p 143:143   -p 465:465   -p 587:587   -p 993:993   -p 995:995    -p 80:80   -p 8080:8080   --name ewomail bestwu/ewomail









