# Pull base image
FROM ubuntu:17.10

# update source
# RUN apt-get update

# Install lrzsz
# RUN apt-get -y install lrzsz


# add local file
ADD jdk-8u152-linux-x64.tar.gz /tmp/


# Install JDK 8
# RUN cd /tmp
WORKDIR /tmp
# RUN tar -xz jdk-8u152-linux-x64.tar.gz
RUN mkdir -p /data
RUN mv /tmp/jdk1.8.0_152/ /data/jdk/


#
ENV JAVA_HOME /data/jdk/
ENV PATH $PATH:$JAVA_HOME/bin

# Expose ports.
EXPOSE 22
EXPOSE 8080
