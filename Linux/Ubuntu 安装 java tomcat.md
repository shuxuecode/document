rz

tar -zxvf jdk-8u152-linux-x64.tar.gz


vi /etc/profile



export JAVA_HOME=/soft/jdk1.8.0_152
export PATH=$PATH:$JAVA_HOME/bin


source /etc/profile
java -version


## 当使用shell脚本启动tomcat时，出现Neither the JAVA_HOME nor the JRE_HOME environment variable is defined

用vim打开tomcat的bin目录下的setclasspath.sh，添加JAVA_HOME和JRE_HOME两个环境变量，两个环境变量路径为您安装的java JDK的路径。

```shell
export JAVA_HOME=/java8
export JRE_HOME=/java8/jre
```

> windows下将export改为set即可。

