



### JVM配置

setenv.sh文件，如果不存在可以手动创建

bin/setenv.sh

```shell


#!/bin/bash  
  
# 设置JAVA_HOME路径  
export JAVA_HOME=/usr/local/jdk-8.0.xxx
  
# 设置JAVA_OPTS参数  
JAVA_OPTS="-Xms512m -Xmx1024m"

```






## 修改docker中Tomcat的配置

先拷贝出来

docker cp 容器ID:/usr/local/tomcat/bin/catalina.sh  /docker/bin/catalina.sh

修改完后，在拷贝回去
docker cp /docker/bin/catalina.sh 容器ID:/usr/local/tomcat/bin/catalina.sh








---

查看内存占用
free -h
