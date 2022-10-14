#!/bin/bash

#mac上执行使用  bash *.sh  方式，否则 echo -n 不换行不生效



 


for e in $(seq 15); do
  echo -n -e  "\r show $e..."
  sleep 1
done
echo

echo -n "123"
echo "456"




