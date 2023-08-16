#!/bin/bash


# 判断字符1中是否包含字符串2
str1="startTime"
str2="time"
result=$(echo $str1 | grep "${str2}")
if [[ "$result" != "" ]]
then
    echo "包含"
else
    echo "不包含"
fi



