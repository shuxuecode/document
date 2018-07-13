# Pull base image
FROM debian:9

# modify apt source.list
RUN echo 'deb http://mirrors.aliyun.com/debian/ stretch main non-free contrib' >> /etc/apt/sources.list
RUN echo 'deb-src http://mirrors.aliyun.com/debian/ stretch main non-free contrib' >> /etc/apt/sources.list
RUN echo 'deb http://mirrors.aliyun.com/debian-security stretch/updates main' >> /etc/apt/sources.list
RUN echo 'deb-src http://mirrors.aliyun.com/debian-security stretch/updates main' >> /etc/apt/sources.list
RUN echo 'deb http://mirrors.aliyun.com/debian/ stretch-updates main non-free contrib' >> /etc/apt/sources.list
RUN echo 'deb-src http://mirrors.aliyun.com/debian/ stretch-updates main non-free contrib' >> /etc/apt/sources.list
RUN echo 'deb http://mirrors.aliyun.com/debian/ stretch-backports main non-free contrib' >> /etc/apt/sources.list
RUN echo 'deb-src http://mirrors.aliyun.com/debian/ stretch-backports main non-free contrib' >> /etc/apt/sources.list


# update source
RUN apt-get clean && apt-get update

# Install lrzsz
RUN apt-get -y install lrzsz vim ssh mysql-server net-tools inetutils-ping

#




#
