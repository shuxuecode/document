
## pom.xml 仓库配置

```xml
<!-- 手动设置仓库 -->
<repositories>
    <repository>
        <id>aliyun-maven</id>
        <name>aliyun-maven</name>
        <url>https://maven.aliyun.com/repository/public</url>
        <layout>default</layout>
        <releases>
            <enabled>true</enabled>
            <updatePolicy>always</updatePolicy>
        </releases>
        <snapshots>
            <!-- <enabled>false</enabled> -->
            <enabled>true</enabled>
            <updatePolicy>always</updatePolicy>
        </snapshots>
    </repository>
</repositories>
```

### 不生效的原因

在settings.xml配置文件中设置了私服代理所有仓库

```xml
<mirrorOf>*</mirrorOf>
```

改为如下即可
```xml
<mirrorOf>*,!aliyun-maven</mirrorOf>
```

错误就出在mirrorOf节点了，如果写*会覆盖掉所有的，不管是哪个repository，最后都被这个镜像所mirror掉了，导致pom文件中的repository不生效了。解决方案也很简单，把这个mirrorOf改掉就好了。




