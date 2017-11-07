# Pull base image
FROM ubuntu:17.10

MAINTAINER zhaoshuxue

# modify apt source.list
RUN echo 'deb http://mirrors.aliyun.com/ubuntu/ trusty main multiverse restricted universe' > /etc/apt/sources.list
RUN echo 'deb http://mirrors.aliyun.com/ubuntu/ trusty-backports main multiverse restricted universe' >> /etc/apt/sources.list
RUN echo 'deb http://mirrors.aliyun.com/ubuntu/ trusty-proposed main multiverse restricted universe' >> /etc/apt/sources.list
RUN echo 'deb http://mirrors.aliyun.com/ubuntu/ trusty-security main multiverse restricted universe' >> /etc/apt/sources.list
RUN echo 'deb http://mirrors.aliyun.com/ubuntu/ trusty-updates main multiverse restricted universe' >> /etc/apt/sources.list
RUN echo 'deb-src http://mirrors.aliyun.com/ubuntu/ trusty main multiverse restricted universe' >> /etc/apt/sources.list
RUN echo 'deb-src http://mirrors.aliyun.com/ubuntu/ trusty-backports main multiverse restricted universe' >> /etc/apt/sources.list
RUN echo 'deb-src http://mirrors.aliyun.com/ubuntu/ trusty-proposed main multiverse restricted universe' >> /etc/apt/sources.list
RUN echo 'deb-src http://mirrors.aliyun.com/ubuntu/ trusty-security main multiverse restricted universe' >> /etc/apt/sources.list
RUN echo 'deb-src http://mirrors.aliyun.com/ubuntu/ trusty-updates main multiverse restricted universe' >> /etc/apt/sources.list

# update source
RUN apt-get clean && apt-get update && apt-get install -y vim

# Install lrzsz
RUN apt-get install -y \
    lrzsz \
    openssh* \
    zip \
    net-tools \
    nodejs \
    aptitude


# mkdir data
RUN mkdir -p /data

# add local file
ADD jdk-8u151-linux-x64.tar.gz /data/
ADD apache-tomcat-8.5.23.tar.gz /data/


# Install JDK 8
WORKDIR /data
RUN mv /data/jdk1.8.0_151/ /data/jdk/


# set path
ENV JAVA_HOME /data/jdk/
ENV PATH $PATH:$JAVA_HOME/bin

# Install tomcat 8
RUN mv /data/apache-tomcat-8.5.23/ /data/tomcat/

# save file
VOLUME ["/data"]



# Expose ports.
EXPOSE 22 8080


#
ENTRYPOINT /data/tomcat/bin/startup.sh && tail -f /data/tomcat/logs/catalina.out
