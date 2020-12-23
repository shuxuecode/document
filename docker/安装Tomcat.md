
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




## tomcat内存配置


或者直接修改start.bat或start.sh文件也行，因为start文件会调用catalina文件，如：
如果是windows环境，在startup.bat中加入set JAVA_OPTS=-Xms256m -Xmx1024m
如果是linux则在startup.sh中加入JAVA_OPTS=-Xms256m -Xmx1024m


修改bin目录下catalina.bat文件@echo off下追加
set JAVA_OPTS=-XX:PermSize=64M -XX:MaxPermSize=128m -Xms512m -Xmx1024m


修改bin目录下catalina.sh文件
在cygwin=false之上
添加以下语句
JAVA_OPTS="-Xms1024m -Xmx4096m -Xss1024K -XX:PermSize=512m -XX:MaxPermSize=2048m"
JAVA_OPTS="-server -Xms256m -Xmx512m -XX:PermSize=64M -XX:MaxPermSize=128m" 

## jvm参数说明：
 
``` 
-server:一定要作为第一个参数，在多个CPU时性能佳 
-Xms：java Heap初始大小。 默认是物理内存的1/64。
-Xmx：java heap最大值。建议均设为物理内存的一半。不可超过物理内存。
 

-XX:PermSize:设定内存的永久保存区初始大小，缺省值为64M。（我用visualvm.exe查看的）
-XX:MaxPermSize:设定内存的永久保存区最大 大小，缺省值为64M。（我用visualvm.exe查看的）
 
-XX:SurvivorRatio=2  :生还者池的大小,默认是2，如果垃圾回收变成了瓶颈，您可以尝试定制生成池设置
 
-XX:NewSize: 新生成的池的初始大小。 缺省值为2M。
-XX:MaxNewSize: 新生成的池的最大大小。   缺省值为32M。
如果 JVM 的堆大小大于 1GB，则应该使用值：-XX:newSize=640m -XX:MaxNewSize=640m -XX:SurvivorRatio=16，或者将堆的总大小的 50% 到 60% 分配给新生成的池。调大新对象区，减少Full GC次数。
 
+XX:AggressiveHeap 会使得 Xms没有意义。这个参数让jvm忽略Xmx参数,疯狂地吃完一个G物理内存,再吃尽一个G的swap。 
-Xss：每个线程的Stack大小，“-Xss 15120” 这使得JBoss每增加一个线程（thread)就会立即消耗15M内存，而最佳值应该是128K,默认值好像是512k. 

-verbose:gc 现实垃圾收集信息 
-Xloggc:gc.log 指定垃圾收集日志文件 
-Xmn：young generation的heap大小，一般设置为Xmx的3、4分之一 
-XX:+UseParNewGC ：缩短minor收集的时间 
-XX:+UseConcMarkSweepGC ：缩短major收集的时间 此选项在Heap Size 比较大而且Major收集时间较长的情况下使用更合适。
-XX:userParNewGC 可用来设置并行收集【多CPU】
-XX:ParallelGCThreads 可用来增加并行度【多CPU】
-XX:UseParallelGC 设置后可以使用并行清除收集器【多CPU】
```

---