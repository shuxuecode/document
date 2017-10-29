##

docker pull gitlab/gitlab-ce

![gitlab-DockerHub.png](gitlab-DockerHub.png)

docker run --name gitlab -t -i -p 60122:22 -p 60180:80 -p 60443:443 gitlab/gitlab-ce:latest /bin/bash

## 


根据dockerfile

默认用户名root
第一次需要设置密码