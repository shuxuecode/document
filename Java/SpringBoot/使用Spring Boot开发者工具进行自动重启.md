## 自动重启原理

Spring Boot的开发者工具会为应用创建两个classloader。一个是用来加载不会变动的类，称为base classloader。另一个是restart classloader，用来加载经常变动的类，默认情况下Spring Boot开发者工具会监控classpath下所有的类。当有类变动时，旧的restart classloader就会被丢弃，然后再创建一个新的，以此来加快重启速度。


pom.xml

添加依赖

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```

在<build>添加插件

```
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <fork>true</fork>
            </configuration>
        </plugin>
    </plugins>
</build>
```



在IntelliJ中，我们必须要执行Build->Build Project才能重新编译新改动的代码


---
