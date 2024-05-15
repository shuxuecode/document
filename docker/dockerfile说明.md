# Dockerfile

Dockerfile的指令是忽略大小写的，建议使用大写，使用 # 作为注释，每一行只支持一条指令，每条指令可以携带多个参数。

**注意事项**

> 1.尽量将Dockerfile放在空目录中，如果目录中必须有其他文件，则使用.dockerignore文件。

> 2.避免安装不必须的包。

> 3.多行参数时应该分类。这样更清晰直白，便于阅读和review，另外，在每个换行符\前都增加一个空格。例如：
```
RUN apt-get update && apt-get install -y \
        package-bar \
        package-baz \
        package-foo
```


## FROM —— 指定基础image

- 指定基础image为该image的最后修改的版本
```
    FROM <image>  
```
- 指定基础image为该image的一个tag版本
```
    FROM <image>:<tag>
```

> FROM必须是除了注释以外的第一行；可以有多个FROM语句，来创建多个image；

## MAINTAINER（用来指定镜像创建者信息）
构建指令，用于将image的制作者相关的信息写入到image中。当我们对该image执行docker inspect命令时，输出中有相应的字段记录该信息。
```
MAINTAINER <name>
```

## RUN（安装软件用）

- 1

尽量避免使用RUN apt-get upgrade或者dist-upgrade，因为基础镜像的很多核心包不会再未授权的容器中升级。
要结合RUN apt-get update和apt-get install在同一个RUN语句下一起使用。如：
```
    RUN apt-get update && apt-get install -y vim
```


## CMD（设置container启动时执行的操作）

设置指令，用于container启动时指定的操作。该操作可以是执行自定义脚本，也可以是执行系统命令。该指令只能在文件中存在一次，如果有多个，则只执行最后一条。

## ENTRYPOINT（设置container启动时执行的操作）

设置指令，指定容器启动时执行的命令，可以多次设置，但是只有最后一个有效。

- 当CMD和ENTRYPOINT同时存在时，那么CMD指令和ENTRYPOINT会互相覆盖只有最后一个CMD或者ENTRYPOINT有效。

## EXPOSE（指定容器需要映射到宿主机器的端口）

```
EXPOSE <port> [<port>...]  
```

## ENV（用于设置环境变量）

```
ENV <key> <value>  
```

## ADD（从src复制文件到container的dest路径）

- 1

将文件<src>拷贝到container的文件系统对应的路径<dest>

所有拷贝到container中的文件和文件夹权限为0755,uid和gid为0

如果文件是可识别的压缩格式，则docker会帮忙 **解压缩**

- 2

构建指令，所有拷贝到container中的文件和文件夹权限为0755，uid和gid为0；如果是一个目录，那么会将该目录下的所有文件添加到container中，不包括目录；如果文件是可识别的压缩格式，则docker会帮忙解压缩（注意压缩格式）；如果<src>是文件且<dest>中不使用斜杠结束，则会将<dest>视为文件，<src>的内容会写入<dest>；如果<src>是文件且<dest>中使用斜杠结束，则会<src>文件拷贝到<dest>目录下。

```
ADD <src> <dest>  
```

<src> 是相对被构建的源目录的相对路径，可以是文件或目录的路径，也可以是一个远程的文件url;
<dest> 是container中的绝对路径


## COPY（只支持从本地文件到容器的拷贝）

对于不需要使用ADD命令tar包自动解压缩功能的文件和目录，你应该总是使用COPY。

## VOLUME（指定挂载点)）

设置指令，使容器中的一个目录具有持久化存储数据的功能，该目录可以被容器本身使用，也可以共享给其他容器使用。我们知道容器使用的是AUFS，这种文件系统不能持久化数据，当容器关闭后，所有的更改都会丢失。当容器中的应用有持久化数据的需求时可以在Dockerfile中使用该指令。

```
VOLUME ["/tmp/data"]  
```
运行通过该Dockerfile生成image的容器，/tmp/data目录中的数据在容器关闭后，里面的数据还存在。

## WORKDIR（切换目录）

设置指令，可以多次切换(相当于cd命令)，对RUN,CMD,ENTRYPOINT生效。

```
WORKDIR /path/to/workdir  
```

## USER（使用哪个用户登录）

设置指令，设置启动容器的用户，默认是root用户。

```
USER daemon
```







## 例子一

```
# Pull base image  
FROM ubuntu:13.10  

MAINTAINER zing wang "zing.jian.wang@gmail.com"  

# update source  
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe"> /etc/apt/sources.list  
RUN apt-get update  

# Install curl  
RUN apt-get -y install curl  

# Install JDK 7  
RUN cd /tmp &&  curl -L 'http://download.oracle.com/otn-pub/java/jdk/7u65-b17/jdk-7u65-linux-x64.tar.gz' -H 'Cookie: oraclelicense=accept-securebackup-cookie; gpw_e24=Dockerfile' | tar -xz  
RUN mkdir -p /usr/lib/jvm  
RUN mv /tmp/jdk1.7.0_65/ /usr/lib/jvm/java-7-oracle/  

# Set Oracle JDK 7 as default Java  
RUN update-alternatives --install /usr/bin/java java /usr/lib/jvm/java-7-oracle/bin/java 300     
RUN update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/java-7-oracle/bin/javac 300     

ENV JAVA_HOME /usr/lib/jvm/java-7-oracle/  

# Install tomcat7  
RUN cd /tmp && curl -L 'http://archive.apache.org/dist/tomcat/tomcat-7/v7.0.8/bin/apache-tomcat-7.0.8.tar.gz' | tar -xz  
RUN mv /tmp/apache-tomcat-7.0.8/ /opt/tomcat7/  

ENV CATALINA_HOME /opt/tomcat7  
ENV PATH $PATH:$CATALINA_HOME/bin  

ADD tomcat7.sh /etc/init.d/tomcat7  
RUN chmod 755 /etc/init.d/tomcat7  

# Expose ports.  
EXPOSE 8080  

# Define default command.  
ENTRYPOINT service tomcat7 start && tail -f /opt/tomcat7/logs/catalina.out  

```


---
