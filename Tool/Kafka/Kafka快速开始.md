
## 官方地址

http://kafka.apache.org/quickstart


> Windows平台可以使用 `bin\windows`目录代替`bin/`目录，执行里面的`.bat`脚本。

## 1、下载并解压


## 启动Kafka服务

因为Kafka依赖Zookeeper，所以如果没有启动zookeeper的话，可以执行下面的命令来启动一个zk服务

```
bin/zookeeper-server-start.sh config/zookeeper.properties
```

接下来可以启动Kafka服务了

```
bin/kafka-server-start.sh config/server.properties
```

## 3、创建一个topic

```
bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic test
```

执行下面命令可以查看topic列表：

```
bin/kafka-topics.sh --list --bootstrap-server localhost:9092
```

## 4、发送消息

```
bin/kafka-console-producer.sh --broker-list localhost:9092 --topic test
```

## 5、消费者

```
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test --from-beginning
```





