
## Spark

> Hadoop基于磁盘的，Spark基于内存的，主要是将中间结果放到内存中，对于迭代运算效率更高

### 基本概念 RDD、DAG、Executor、Application、Task、Job、Stage

- **RDD** : 弹性分布式数据集的简称，是分布式内存的一个抽象概念 ，提供了一个高度共享的内存模型。
RDD的依赖关系：窄依赖和宽依赖

- **DAG** ： 有向无环图，反映RDD之间的依赖关系。
Spark基于DAG的任务调度执行机制，要优于Hadoop MapReduce的迭代执行机制。

- **Executor**：是运行在工作节点（WorkerNode）的一个进程，负责运行Task。

- **Application**：用户编写的Spark应用程序。

- **Task**：运行在Executor上的工作单元。

- **Job**：一个Job包含多个RDD及作用于相应RDD上的各种操作。

- **Stage**：是Job的基本调度单位，一个Job会分为多组Task，每组Task被称为Stage，或者也被称为TaskSet，代表一组关联的，相互之间没有Shuffle依赖关系的任务组成的任务集。

一个Application由一个Driver和若干个Job构成，一个Job由多个Stage构成，一个Stage由多个没有Shuffle关系的Task组成。


> 参考文章：https://charming.blog.csdn.net/article/details/79912343

---



## Storm 

Apache Storm 是一个能近实时地在数据之上运行用户代码片段的流式数据处理框架。它实际上是一系列连在一起的管道。通常用于简单的分析任务 ，诸如计算，以及清洗，使其常规化，并且准备摄入用于长期存储的数据。



## Flink
Flink是一款基于状态的流式计算框架，它具有以下特点：
1. 既可进行流式（Stream）计算，也可以进行批处理（Batch）计算
2. 基于状态的计算，正是这种可管理的状态计算，让Flink实现了Exactly Once
3. 窗口（Window）式计算，主要针对于Stream无界的数据流
4. 完整的容错机制，包括CheckPoint和SavePoint
5. 分布式计算，支持高可用

Flink运行架构，主要由客户端（Client）、Master（JobManager）、Worker（TaskManager）组成，由客户端将应用程序提交到JobManager，然后由JobManager进行任务解析和划分，将任务分发给TaskManager去执行。


- **TaskManager**
是一个进程，及一个JVM（Flink用java实现）。主要作用是接收并执行JobManager发送的task，并且与JobManager通信，反馈任务状态信息，比如任务分执行中，执行完等状态

- **JobManager**
主要负责申请资源，协调以及控制整个job的执行过程，具体包括，调度任务、处理checkpoint、容错等等


Flink提供了完整的容错机制，包括针对于计算的CheckPoint机制，以及针对于Job的SavePoint功能。


---

## Hadoop

Hadoop实现了一个分布式文件系统(Hadoop Distributed File System)，简称HDFS。Hadoop的框架最核心的设计就是：HDFS和MapReduce。HDFS为海量的数据提供了存储，MapReduce则为海量的数据提供了计算。

### shuffle

Shuffle 过程本质上都是将 Map 端获得的数据使用分区器进行划分，并将数据发送给对应的 Reducer 的过程。

shuffle是连接Map和Reduce之间的桥梁。
Map阶段通过shuffle读取数据并输出到对应的Reduce，而Reduce阶段负责从Map端拉取数据并进行计算。
Map的输出要用到Reduce中必须经过shuffle这个环节，**shuffle的性能高低直接影响了整个程序的性能和吞吐量**。因为在分布式情况下，reduce task需要跨节点去拉取其它节点上的map task结果。这一过程将会产生网络资源消耗和内存，磁盘IO的消耗。

通常shuffle分为两部分：Map阶段的数据准备和Reduce阶段的数据拷贝处理。一般将在map端的Shuffle称之为Shuffle Write，在Reduce端的Shuffle称之为Shuffle Read。


## Hbase
开放源代码，非关系型，分布式数据库，采用Google的BigTable建模，用Java编写，并在HDFS上运行。



---

## ES
分布式搜索引擎，底层是Lucene

> 准实时？？

### 倒排索引

#### 正排索引  ——  文件ID对应到关键词的映射
文档1 ——>  我，你，他
文档2 ——>  我，你

#### 倒排索引  ——  关键词到文件ID的映射
我 ——> 文档1，文档2
你 ——> 文档1，文档2
他 ——> 文档1

**再加上出现频率 和 位置**


> https://blog.csdn.net/andy_wcl/article/details/81631609

查找数据的过程？？ 节点？？

### es分布式，扩容原理

---

## ClickHouse
面向列式存储的关系型数据库

列式存储的优点：
- 1、相较于行式存储，列式存储的查询速度非常快。
- 2、数据易维护，当我们更新数据时，历史数据会有版本号，不会被改变或者消失。
- 3、读取过程中不会产生冗余数据，非常适合大数据分析和高并发。
- 4、数据可以被压缩

缺点就是表关联


```markdown
二、适用场景

    志数据行为分析
    标签画像的分析
    数据集市分层
    广告系统和实时竞价广告
    电商和金融行业
    实时监控和遥感测量
    商业智能
    在线游戏
    信息安全
    所有的互联网场景

三、特性

    真正的列式数据库
    数据压缩
    数据的磁盘存储
    多核并行处理
    多服务器分布式处理（数据保存在不同的shard上，每一个shard都由一组用于容错的副本组成，可并行查询所有shard）
    向量引擎（按列的一部分进行处理，高效实用CPU）
    实时的数据更新（支持在表中定义主键,数据增量有序存储在mergeTree中）
    索引（按照主键对数据进行排序，毫秒内完成对数据的查找）
    适合在线查询
    支持近似计算（允许牺牲精度的情况下低延迟查询）
    支持数据复制和数据完整性（异步多主复制技术）

四、 缺陷

    没有完整的事务支持
    缺少高频率低延迟的修改或删除数据的能力
    不适合通过其检索单行的点查询
    联机事物处理
    二进制数据或文件存储
    键值对数据高效率访问请求

五、核心概念
5.1.表引擎（Engine）

         表引擎决定了数据在文件系统中的存储方式，常用的也是官方推荐的存储引擎是MergeTree系列，如果需要数据副本的话可以使用ReplicatedMergeTree系列，相当于MergeTree的副本版本。读取集群数据需要使用分布式表引擎Distribute。
5.2.表分区（Partition）

         表中的数据可以按照指定的字段分区存储，每个分区在文件系统中都是都以目录的形式存在。常用时间字段作为分区字段，数据量大的表可以按照小时分区，数据量小的表可以在按照天分区或者月分区，查询时，使用分区字段作为Where条件，可以有效的过滤掉大量非结果集数据。
5.3.分片（Shard）

         一个分片本身就是ClickHouse一个实例节点，分片的本质就是为了提高查询效率，将一份全量的数据分成多份（片），从而降低单节点的数据扫描数量，提高查询性能。
5.4. 复制集（Replication）

         简单理解就是相同的数据备份，在CK中通过复制集，我们实现保障了数据可靠性外，也通过多副本的方式，增加了CK查询的并发能力。这里一般有2种方式： （1）基于ZooKeeper的表复制方式； （2）基于Cluster的复制方式。由于我们推荐的数据写入方式本地表写入，禁止分布式表写入，所以我们的复制表只考虑ZooKeeper的表复制方案。
5.5.集群（Cluster）

可以使用多个ClickHouse实例组成一个集群，并统一对外提供服务。
```