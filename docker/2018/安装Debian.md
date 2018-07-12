

docker run --name debian1 -t -i -p 60027:22 debian:latest /bin/bash 



apt-get update

apt-get install vim

apt-get install ssh


docker exec -it debian1 service ssh start



