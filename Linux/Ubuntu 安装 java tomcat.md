rz

tar -zxvf jdk-8u152-linux-x64.tar.gz


vi /etc/profile



export JAVA_HOME=/soft/jdk1.8.0_152
export PATH=$PATH:$JAVA_HOME/bin


source /etc/profile
java -version
