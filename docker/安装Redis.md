## 拉取镜像:
docker pull redis

docker pull redis:latest

## 启动容器

docker run -itd --name redis -p 6379:6379 --restart=always redis:latest


## 进入容器

```shell
docker exec -it redis /bin/bash

/# redis-cli

127.0.0.1:6379> keys *

```

