## docker build

使用当前目录的Dockerfile创建镜像。
docker build -t com/ubuntu:zsx .
注意最后一个点，表示当前目录下的Dockerfile

	docker build -t ubuntu:zsx .

## 删除镜像

强制删除本地镜像runoob/ubuntu:v4。

docker rmi -f runoob/ubuntu:v4

---

## 查看docker日志


docker logs -f -t --tail 行数 容器名

例如：查看mysql容器最后10行日志

docker logs -f -t --tail 10 mysql





















---