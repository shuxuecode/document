
## 下载和安装

[官网地址](https://github.com/filebrowser/filebrowser)

下载完后解压
```
tar -xvf linux-amd64-filebrowser.tar.gz
```


2、配置

（1）创建配置数据库
```
./filebrowser -d /filebrowser/filebrowser.db config init
```
（2）设置监听地址
```
./filebrowser -d /filebrowser/filebrowser.db config set --address 192.168.0.101
```
（3）设置监听端口
```
./filebrowser -d /filebrowser/filebrowser.db config set --port 80
```
（4）设置中文语言环境
```
./filebrowser -d /filebrowser/filebrowser.db config set --locale zh-cn
```
（5）设置日志文件位置
```
./filebrowser -d /filebrowser/filebrowser.db config set --log /filebrowser/filebrowser.log
```
（6）添加用户
```
./filebrowser -d /filebrowser/filebrowser.db users add test 123456 --perm.admin

```

File Browser 默认是前台运行，执行下面命令可以后台运行
```
nohup filebrowser -d /etc/filebrowser.db >/dev/null 2>&1 &
```


---