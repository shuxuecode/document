## 各个mq的比较  *****





## Kafka

内部原理？工作流程？



除了消息顺序追加、页缓存等技术，Kafka 还使用零拷贝技术来进一步提升性能。所谓的零拷贝是指将数据直接从磁盘文件复制到网卡设备中，而不需要经由应用程序之手。零拷贝大大提高了应用程序的性能，减少了内核和用户模式之间的上下文切换。对 Linux 操作系统而言，零拷贝技术依赖于底层的 sendfile() 方法实现。对应于 Java 语言，FileChannal.transferTo() 方法的底层实现就是 sendfile() 方法。

怎么实现 Exactly-Once？


## 重复消费

## 消息丢失

## 消息重试

## mq如何保证顺序

kafka同一个partition下的场景，可以保证FIFO的顺序。不同partition之间不能保证顺序。多partition下无法保障消息的顺序性

Kafka 中发送1条消息的时候，可以指定(topic, partition, key) 3个参数。partiton 和 key 是可选的。如果你指定了 partition，那就是所有消息发往同1个 partition，就是有序的。并且在消费端，Kafka 保证，1个 partition 只能被1个 consumer 消费。或者你指定 key（比如 order id），具有同1个 key 的所有消息，会发往同1个 partition。也是有序的。


## 消息积压