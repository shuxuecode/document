## 在线安装

sudo apt-get install redis-server


启动  redis-server
重启  redis-server restart
客户端  redis-cli



配置文件
/etc/redis/redis.conf


---

redis-server 这种启动方式，是非守护进程，会被kill掉，所以要用配置文件方式来启动

redis-server /etc/redis/redis.conf




---
