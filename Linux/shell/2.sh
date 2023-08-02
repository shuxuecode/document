#!/bin/bash

#mac上执行使用  bash *.sh  方式，否则 echo -n 不换行不生效



 

format="+%Y-%m-%d %H:%M:%S"

echo "$(date "$format") 1"

sleep 2

echo "$(date "$format") 2"

echo " "
echo " "
echo " "


echo "$(date "$format") 3"

