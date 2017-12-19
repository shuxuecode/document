

rocketmq/distribution/target/apache-rocketmq

cat bin/runbroker.sh


JAVA_OPT="${JAVA_OPT} -server -Xms1g -Xmx1g -Xmn1g"


---

- 配置好了环境


docker run --name rocketmq -t -i -p 51022:22 -p 28080:8080 -p 28081:8081 -p  9876:9876 rocketmq:1 /bin/bash

- 开始

apt-get update

apt-get install openssh*

apt-get install vim

apt-get install lrzsz

apt-get install git

上传maven

/data/maven/bin/mvn
修改 settings.xml
改为阿里的仓库
maven/conf/setting.xml 中的 <mirrors></mirrors> 添加以下内容后重新编译：

<mirror>
    <id>aliyun</id>
    <mirrorOf>central</mirrorOf>
    <name>aliyun maven</name>
    <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
</mirror>



#

### Clone & Build
```
  > git clone -b develop https://github.com/apache/rocketmq.git
  > cd rocketmq
  > mvn -Prelease-all -DskipTests clean install -U
  > cd distribution/target/apache-rocketmq
```

### Start Name Server
```
  > nohup sh bin/mqnamesrv &
  > tail -f ~/logs/rocketmqlogs/namesrv.log
  The Name Server boot success...
```  


### Start Broker

修改 vi bin/runbroker.sh
把`JAVA_OPT="${JAVA_OPT} -server -Xms8g -Xmx8g -Xmn4g"`
改为`JAVA_OPT="${JAVA_OPT} -server -Xms1g -Xmx1g -Xmn1g"`

```
  > nohup sh bin/mqbroker -n localhost:9876 &
  > tail -f ~/logs/rocketmqlogs/broker.log
  The broker[%s, 172.30.30.233:10911] boot success...
```


## web控制台

git clone https://github.com/apache/rocketmq-externals.git

cd /data/rocketmq-externals/rocketmq-console

先设置mq的连接地址信息，
vi src/main/resources/application.properties
设置ip：端口
rocketmq.config.namesrvAddr=localhost:9876

执行

/data/maven/bin/mvn spring-boot:run

浏览器访问:8080
































---
