## 运行系统

docker run --name hbase -t -i -p 60023:22 -p 60000:60000 -p 60010:60010 -p 60020:60020 -p 60030:60030 ubuntu:17.10.ok /bin/bash 

## 安装jdk






---

## docker镜像

docker pull harisekhon/hbase:2.1

docker run --name hbase -t -i -p 16000:16000 -p 16010:16010 -p 16020:16020 -p 16030:16030 -p 2181:2181 harisekhon/hbase:2.1 /bin/bash






## Hbase 命令

> 进入hbase安装目录，执行`bin/hbase shell`，进入命令行

- 查看版本

hbase(main):054:0> version
2.1.3, rda5ec9e4c06c537213883cca8f3cc9a7c19daf67, Mon Feb 11 15:45:33 CST 2019
Took 0.0004 seconds




向表中添加数据，在想HBase的表中添加数据的时候，只能一列一列的添加，不能同时添加多列。