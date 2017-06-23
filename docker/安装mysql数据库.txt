## 拉取镜像:
docker pull daocloud.io/library/mysql:latest

docker pull daocloud.io/library/mysql:5.7.5

## 启动容器
docker run --name mysqlb -p 33306:3306 -e MYSQL_ROOT_PASSWORD=root -d daocloud.io/library/mysql:latest


宿主机直接连接localhost:33306 root root  即可成功


















