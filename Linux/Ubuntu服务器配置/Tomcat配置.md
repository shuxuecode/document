



### JVM配置






## 修改docker中Tomcat的配置

先拷贝出来

docker cp 容器ID:/usr/local/tomcat/bin/catalina.sh  /docker/bin/catalina.sh

修改完后，在拷贝回去
docker cp /docker/bin/catalina.sh 容器ID:/usr/local/tomcat/bin/catalina.sh


