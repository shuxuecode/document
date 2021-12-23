
## 前言

原先项目都是用springMVC加dubbo做的分布式服务，最近有空研究了一下springCloud集成dubbo的过程，因为阿里巴巴前几个月已经官方提供了对应springBoot的dubbo-starter，所以我们可以直接引入依赖即可。


> 1、基于springBoot 2.0.1.RELEASE 版本 （需要注意这个不再支持jdk1.7了）
> 2、基于springCloud Finchley.SR1 版本
> 3、服务注册中心使用的zookeeper


## dubbo的rpc接口client包

这里主要是三个工程，一个是提供rpc接口声明的client项目，最后它生成一个jar包，供生产者和消费者引用。
第二个项目是生产者 —— dubbo-producer
第三个项目是消费者 —— dubbo-consumer

### client项目

#### pom.xml 文件

 直接用mvn命令生成的pom即可，这里没做任何改动

```

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.zsx</groupId>
  <artifactId>dubbo-client</artifactId>
  <packaging>jar</packaging>
  <version>1.0.0-SNAPSHOT</version>
  <name>dubbo-client</name>
  <url>http://maven.apache.org</url>
  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>

```

#### rpc接口 ServerAgent.java

 这里只简单写了一个接口

```

public interface ServerAgent {
    String formatUUID(String uuid);
}

```

好了，client项目就这些内容，直接打成jar包即可，得到 —— dubbo-client-1.0.0-SNAPSHOT.jar

## 生产者 producer 项目

### pom.xml

 主要引入了 dubbo-spring-boot-starter 和 zookeeper 所依赖的pom，还有上边生产的client jar包。
```
 <dependency>
     <groupId>com.zsx</groupId>
     <artifactId>dubbo-client</artifactId>
     <version>1.0.0-SNAPSHOT</version>
 </dependency>
```

下面是完整的pom.xml

```

<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.zsx</groupId>
    <artifactId>dubbo-producer</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>

    <name>dubbo-producer Maven Webapp</name>
    <!-- FIXME change it to the project's website -->
    <url>http://www.example.com</url>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
    </properties>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.0.1.RELEASE</version>
    </parent>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>Finchley.SR1</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <dependencies>

        <dependency>
            <groupId>com.alibaba.spring.boot</groupId>
            <artifactId>dubbo-spring-boot-starter</artifactId>
            <version>2.0.0</version>
        </dependency>

        <!-- 自定义接口 -->
        <dependency>
            <groupId>com.zsx</groupId>
            <artifactId>dubbo-client</artifactId>
            <version>1.0.0-SNAPSHOT</version>
        </dependency>

        <dependency>
            <groupId>org.apache.zookeeper</groupId>
            <artifactId>zookeeper</artifactId>
            <version>3.4.6</version>
        </dependency>
        <dependency>
            <groupId>com.github.sgroschupf</groupId>
            <artifactId>zkclient</artifactId>
            <version>0.1</version>
        </dependency>

    </dependencies>


    <build>
        <finalName>dubbo-producer</finalName>
        <pluginManagement><!-- lock down plugins versions to avoid using Maven defaults (may be moved to parent pom) -->
            <plugins>
                <plugin>
                    <artifactId>maven-clean-plugin</artifactId>
                    <version>3.0.0</version>
                </plugin>
                <!-- see http://maven.apache.org/ref/current/maven-core/default-bindings.html#Plugin_bindings_for_war_packaging -->
                <plugin>
                    <artifactId>maven-resources-plugin</artifactId>
                    <version>3.0.2</version>
                </plugin>
                <plugin>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <version>3.7.0</version>
                </plugin>
                <plugin>
                    <artifactId>maven-surefire-plugin</artifactId>
                    <version>2.20.1</version>
                </plugin>
                <plugin>
                    <artifactId>maven-war-plugin</artifactId>
                    <version>3.2.0</version>
                </plugin>
                <plugin>
                    <artifactId>maven-install-plugin</artifactId>
                    <version>2.5.2</version>
                </plugin>
                <plugin>
                    <artifactId>maven-deploy-plugin</artifactId>
                    <version>2.8.2</version>
                </plugin>
            </plugins>
        </pluginManagement>
    </build>
</project>

```

### rpc接口实现类 ServerAgentImpl.java

 简单实现一下接口

```

import com.alibaba.dubbo.config.annotation.Service;
import org.springframework.stereotype.Component;


@Service(interfaceClass = ServerAgent.class)
@Component
public class ServerAgentImpl implements ServerAgent {

    @Override
    public String formatUUID(String uuid) {
        return uuid.replace("-", "!@#");
    }
}

```

### 项目的启动类

 主要是添加注解 ： `@EnableDubboConfiguration`

```
import com.alibaba.dubbo.spring.boot.annotation.EnableDubboConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableDubboConfiguration
public class App {

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}

}

```

### 配置文件 application.yml

 这里需要配置zookeeper的地址，以及dubbo对外暴露的端口 20888

```
server:
    port: 18081

spring:
    application:
        name: server-producer

## dubbo springboot 配置
    dubbo:
        application:
            id: live-dubbo-provider
            name: live-dubbo-provider
        registry:
            address: zookeeper://127.0.0.1:2181
        server: true
        protocol:
            name: dubbo
            port: 20888

```

 至此，dubbo生产者的项目就配置好了，可以直接运行启动了。（如果有dubbo-admin可以查看一下服务是否注册成功）


## 消费者 dubbo-consumer 项目

 pom文件跟生产者一样，只是这里为了测试，多加了一个web-starter，但需要注意它的log依赖跟dubbo的有冲突，需要剔除一下

### pom.xml

```

<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.zsx</groupId>
    <artifactId>dubbo-consumer</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>

    <name>dubbo-consumer Maven Webapp</name>
    <!-- FIXME change it to the project's website -->
    <url>http://www.example.com</url>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
    </properties>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.0.1.RELEASE</version>
    </parent>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>Finchley.SR1</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <dependencies>

        <dependency>
            <groupId>com.alibaba.spring.boot</groupId>
            <artifactId>dubbo-spring-boot-starter</artifactId>
            <version>2.0.0</version>
        </dependency>

        <!-- 自定义接口 -->
        <dependency>
            <groupId>com.zsx</groupId>
            <artifactId>dubbo-client</artifactId>
            <version>1.0.0-SNAPSHOT</version>
        </dependency>

        <dependency>
            <groupId>org.apache.zookeeper</groupId>
            <artifactId>zookeeper</artifactId>
            <version>3.4.6</version>
        </dependency>
        <dependency>
            <groupId>com.github.sgroschupf</groupId>
            <artifactId>zkclient</artifactId>
            <version>0.1</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <exclusions>
                <exclusion>
                    <groupId>ch.qos.logback</groupId>
                    <artifactId>logback-classic</artifactId>
                </exclusion>
            </exclusions>
        </dependency>

        <!-- 加这个有logback的jar冲突，有空解决下 -->
        <!--<dependency>-->
        <!--<groupId>org.springframework.boot</groupId>-->
        <!--<artifactId>spring-boot-starter-test</artifactId>-->
        <!--<scope>test</scope>-->
        <!--</dependency>-->

    </dependencies>


    <build>
        <finalName>dubbo-consumer</finalName>
        <pluginManagement><!-- lock down plugins versions to avoid using Maven defaults (may be moved to parent pom) -->
            <plugins>
                <plugin>
                    <artifactId>maven-clean-plugin</artifactId>
                    <version>3.0.0</version>
                </plugin>
                <!-- see http://maven.apache.org/ref/current/maven-core/default-bindings.html#Plugin_bindings_for_war_packaging -->
                <plugin>
                    <artifactId>maven-resources-plugin</artifactId>
                    <version>3.0.2</version>
                </plugin>
                <plugin>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <version>3.7.0</version>
                </plugin>
                <plugin>
                    <artifactId>maven-surefire-plugin</artifactId>
                    <version>2.20.1</version>
                </plugin>
                <plugin>
                    <artifactId>maven-war-plugin</artifactId>
                    <version>3.2.0</version>
                </plugin>
                <plugin>
                    <artifactId>maven-install-plugin</artifactId>
                    <version>2.5.2</version>
                </plugin>
                <plugin>
                    <artifactId>maven-deploy-plugin</artifactId>
                    <version>2.8.2</version>
                </plugin>
            </plugins>
        </pluginManagement>
    </build>
</project>

```

### 配置文件 application.yml

 先声明一下zookeeper的地址，这里不需要配置dubbo的端口

```

server:
    port: 18083

spring:
    application:
        name: client-consumer

##  dubbo springboot 配置
    dubbo:
        application:
            id: live-dubbo-consumer
            name: live-dubbo-consumer
        registry:
            address: zookeeper://127.0.0.1:2181




```

### 调用方法 ConsumerController.java

 主要使用dubbo提供的注解`@Reference`

```
package com.zsx.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zsx.agent.ServerAgent;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class ConsumerController {

    @Reference(check = false)//启动消费者不检查服务者是否存在
//    @Reference(url = "dubbo://127.0.0.1:20888") // 这种方式直接指定url
    public ServerAgent serverAgent;

    @RequestMapping(value = "/uuid", method = RequestMethod.GET)
    public String uuid() {
        return serverAgent.formatUUID(UUID.randomUUID().toString());
    }
}

```

### 启动方法

同样需要添加注解 `@EnableDubboConfiguration`

```
import com.alibaba.dubbo.spring.boot.annotation.EnableDubboConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableDubboConfiguration
public class App {

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

}
```

 这样，消费者的代码也都完成了，启动一下，然后在浏览器输入：
 http://localhost:18083/uuid
 就能看到格式化后的uuid了


---

以上代码全部上传到了github，地址为：

https://github.com/shuxuecode/springCloud/tree/master/dubbo-spring-cloud


---
