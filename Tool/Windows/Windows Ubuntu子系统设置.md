

## ssh

默认是没有开启SSH服务的，需要手动配置开启

- 安装

apt-get install openssh-server

- 修改配置

vi /etc/ssh/sshd_config


> 下面以密码登录的配置作说明：

```
Port = 22 # 默认是22端口，如果和windows端口冲突或你想换成其他的否则不用动
#ListenAddress 0.0.0.0 # 如果需要指定监听的IP则去除最左侧的井号，并配置对应IP，默认即监听PC所有IP
PermitRootLogin no # 如果你需要用 root 直接登录系统则此处改为 yes
PasswordAuthentication no # 将 no 改为 yes 表示使用帐号密码方式登录
```

- 启动 ssh 服务

service ssh start


> 如果提示 sshd error: could not load host key 则需要重新生成 key

dpkg-reconfigure openssh-server

- 查看服务状态

```
service ssh status
# * sshd is running  显示此内容则表示启动正常
```


---