# 安装

##

    tar -zxvf jdk-7u80-linux-x64.tar.gz

- 配置java环境变量


    vi /etc/profile

-

export JAVA_HOME=/usr/java/jdk17

export PATH=$PATH:$JAVA_HOME/bin

- 让环境变量生效

source /etc/profile


## 安装Hbase

- 上传

- 解压

tar -zxvf hbase-1.2.6-bin.tar.gz

- 重命名

mv hbase-1.2.6 hbase

-

export JAVA_HOME=/usr/java/jdk17/

- 将pinpoint\hbase\scripts下的hbase-create.hbase文件上传到hbase目录下，执行

bin/hbase shell hbase-create.hbase

```
[root@CRMmongo1 hbase]# bin/hbase shell hbase-create.hbase
2017-07-12 16:26:59,702 WARN  [main] util.NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
0 row(s) in 1.9270 seconds

0 row(s) in 2.2560 seconds

0 row(s) in 2.2790 seconds

0 row(s) in 1.2320 seconds

0 row(s) in 1.2400 seconds

0 row(s) in 1.2660 seconds

0 row(s) in 1.4120 seconds

0 row(s) in 1.2510 seconds

0 row(s) in 1.2350 seconds

0 row(s) in 4.2650 seconds

0 row(s) in 4.2890 seconds

0 row(s) in 1.2390 seconds

0 row(s) in 1.2440 seconds

0 row(s) in 1.2670 seconds

0 row(s) in 1.2370 seconds

0 row(s) in 2.2770 seconds

TABLE                                                                                                                   
AgentEvent                                                                                                              
AgentInfo                                                                                                               
AgentLifeCycle                                                                                                          
AgentStat                                                                                                               
AgentStatV2                                                                                                             
ApiMetaData                                                                                                             
ApplicationIndex                                                                                                        
ApplicationMapStatisticsCallee_Ver2                                                                                     
ApplicationMapStatisticsCaller_Ver2                                                                                     
ApplicationMapStatisticsSelf_Ver2                                                                                       
ApplicationTraceIndex                                                                                                   
HostApplicationMap_Ver2                                                                                                 
SqlMetaData_Ver2                                                                                                        
StringMetaData                                                                                                          
TraceV2                                                                                                                 
Traces                                                                                                                                                                                                               
16 row(s) in 0.0370 seconds

[root@CRMmongo1 hbase]#

```

-




http://192.168.11.117:16010/master-status



##

- 上传tomcat

- 解压并重命名

tar -zxvf apache-tomcat-7.0.69.tar.gz

mv apache-tomcat-7.0.69 pp-collector
mv apache-tomcat-7.0.69 pp-web






##



/data/pinpoint/pp-agent/pinpoint-bootstrap-1.6.2.jar




```
CATALINA_OPTS="$CATALINA_OPTS -javaagent:/data/pinpoint/pp-agent/pinpoint-bootstrap-1.6.2.jar"
CATALINA_OPTS="$CATALINA_OPTS -Dpinpoint.agentId=myapp"
CATALINA_OPTS="$CATALINA_OPTS -Dpinpoint.applicationName=MyTestPP"
```




































































































































































































































































---    
