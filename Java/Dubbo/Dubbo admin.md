Dubbo admin 安装

dubbo-admin 是 dubbo管理平台，可以对dubbo进行精确的控制。

新版的dubboAdmin是用springBoot编写的，具体可以查看github说明。

地址：https://github.com/apache/incubator-dubbo-ops

可以看到如下描述：

```

How to use it

You can get a release of dubbo monitor in two steps:

dubbo admin

dubbo admin is a spring boot application, you can start it with fat jar or in IDE directly

dubbo monitor and dubbo registry

Step 1:
git clone https://github.com/apache/incubator-dubbo-ops
Step 2:
cd incubator-dubbo-ops && mvn package
Then you will find:

dubbo-monitor-simple-2.0.0-assembly.tar.gz in incubator-dubbo-ops\dubbo-monitor-simple\target directory. Unzip it you will find the shell scripts for starting or stopping monitor.
dubbo-registry-simple-2.0.0-assembly.tar.gz in incubator-dubbo-ops\dubbo-registry-simple\target directory. Unzip it you will find the shell scripts for starting or stopping registry.

```

- 根据提示，先把代码download下来，

```
git clone https://github.com/apache/incubator-dubbo-ops
```

- 然后进到 `incubator-dubbo-ops/dubbo-admin/src/main/resources` 目录下，修改配置文件`application.properties`


```
server.port=7001
spring.velocity.cache=false
spring.velocity.charset=UTF-8
spring.velocity.layout-url=/templates/default.vm
spring.messages.fallback-to-system-locale=false
spring.messages.basename=i18n/message
spring.root.password=root
spring.guest.password=guest

dubbo.registry.address=zookeeper://127.0.0.1:2181
```


1、可以修改tomcat的端口，默认7001

2、修改zookeeper的地址，默认是本地

3、修改root用户和guest用户的密码



- 最后编译：

```
mvn package
```

编译成功后，进入到target目录，可以看到jar文件`dubbo-admin-0.0.1-SNAPSHOT.jar`

- 执行启动命令

```
java -jar dubbo-admin-0.0.1-SNAPSHOT.jar
```

看到应用启动成功的提示信息后，在浏览器打开：http://localhost:7001，输入root账户和密码后即可进入到dubbo-admin的web控制台界面。











