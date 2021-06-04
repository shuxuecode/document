
## Flink

官网下载最新文档版本
https://flink.apache.org/downloads.html

**下面所有的步骤均在ubuntu18.04版本上操作，且配置好了jdk1.8环境**

### 单机版集群搭建

解压安装包
sudo tar xzf flink-1.13.1-bin-scala_2.12.tgz

进入到flink目录
cd flink-1.13.1

启动单机版集群
sudo bin/start-cluster.sh

```
如果出现如下的提示信息：
Please specify JAVA_HOME. Either in Flink config ./conf/flink-conf.yaml or as system-wide JAVA_HOME.

可以去修改./conf/flink-conf.yaml，添加下面的配置


    env.java.home: 你的jdk目录

```

启动成功后可以在浏览器打开web控制台

http://localhost:8081/


#### 运行一个简单的任务

1. 可以在web控制台，提交一个任务
    - 左侧菜单选择`Submit New Job`，点击`+ Add New`
    - 选择flink目录下的 `/examples/streaming/WordCount.jar`
    - 点击`Submit`，然后在`Completed Jobs`菜单可以看到执行完成的job，点击job可以查看详细信息
    - 点击菜单`Job Manager`，选择tab标签`Log List`，可以查看刚才job的执行日志 `flink-root-taskexecutor-*.out`

2. 启动一个实时计算的任务
    - 执行命令 `nc -l 9000`，启动一个连接9000端口的客户端服务（如果没有nc，执行`sudo apt install netcat`进行安装）
    - 在flink安装目录，执行`sudo bin/flink run examples/streaming/SocketWindowWordCount.jar --port 9000`
    - 此时，在`Running Jobs`菜单可以看到当前正在执行的任务
    - 回到监听9000端口的命令窗口，输入一些单词后回车，重复操作几次后，可以在log中看到统计的结果日志。



