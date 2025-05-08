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


## 手动安装

- 下载

> wget http://download.redis.io/releases/redis-5.0.7.tar.gz

- 解压

tar -zxvf redis-5.0.7.tar.gz

- 前置依赖

sudo apt install gcc

- 进入redis-5.0.7

sudo make

报错：

```
cd src && make all
make[1]: Entering directory '/data/redis-5.0.7/src'
    CC Makefile.dep
    CC adlist.o
In file included from adlist.c:34:0:
zmalloc.h:50:10: fatal error: jemalloc/jemalloc.h: No such file or directory
 #include <jemalloc/jemalloc.h>
          ^~~~~~~~~~~~~~~~~~~~~
compilation terminated.
Makefile:248: recipe for target 'adlist.o' failed
make[1]: *** [adlist.o] Error 1
make[1]: Leaving directory '/data/redis-5.0.7/src'
Makefile:6: recipe for target 'all' failed
make: *** [all] Error 2
```

解决方法：
cd deps
make hiredis lua jemalloc linenoise







---
