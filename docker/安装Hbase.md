## 运行系统

docker run --name hbase -t -i -p 60023:22 -p 60000:60000 -p 60010:60010 -p 60020:60020 -p 60030:60030 ubuntu:17.10.ok /bin/bash 

## 安装jdk






---

## docker镜像

docker pull harisekhon/hbase:2.1

docker run --name hbase -t -i -p 16000:16000 -p 16010:16010 -p 16020:16020 -p 16030:16030 -p 2181:2181 harisekhon/hbase:2.1 /bin/bash