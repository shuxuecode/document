


## CAP原则

CP：关注一致性
AP：关注可用性


## 服务高可用？

## Dubbo
服务暴露和引用过程

### 协议

- dubbo:// 推荐
- hessian:// 
- http://
- rmi://
- webservice://
- thrift://
- redis://


### 注册中心，怎么选择

### 序列化框架，默认hessian2

Hessian会把复杂的对象所有属性存储在一个Map中进行序列化。所以在父类、子类中存在同名成员变量的情况下，hessian序列化时，先序列化子类，然后序列化父类。因此，反序列化结果会导致子类同名成员变量被父类的值覆盖。

hession、hession2、java序列化

### SPI扩展服务发现机制 ？？

> SPI规范：约定在 Classpath 下的 META-INF/services/ 目录里创建一个以服务接口命名的文件，然后文件里面记录的是此 jar 包提供的具体实现类的全限定名。




### 负载均衡策略？


### 容错机制？？

### dubbo服务端和调用端超时时间设置和区别 ？

### 限流

参考文章：
https://cloud.tencent.com/developer/article/1502742
https://blog.csdn.net/u012965203/article/details/98253914

令牌桶
漏桶

---



- 读服务开启重试，写服务设置 retries=“0” ，防止数据重复，也可以做接口幂等处理
- 直连 url=""


## gRPC

是Google开发的高性能、通用的开源RPC框架，其由Google主要面向移动应用开发并基于HTTP/2协议标准而设计，基于ProtoBuf(Protocol Buffers)序列化协议开发。本身它不是分布式的，所以要实现上面的框架的功能需要进一步的开发。

## thrift

最初是由 Facebook 开发的内部系统跨语言的高性能 RPC 框架，2007 年贡献给了 Apache 基金，成为 Apache 开源项目之一， 跟 gRPC 一样，Thrift 也有一套自己的接口定义语言 IDL，可以通过代码生成器，生成各种编程语言的 Client 端和 Server 端的 SDK 代码，支持多种语言。

---

## ZooKeeper

它是一个基于ZAB协议实现的可靠的分布式协调系统，它是强一致（CP）、使用基于TCP的私有协议通信

watch监听通知原理







