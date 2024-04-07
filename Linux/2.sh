#!/bin/bash


echo -e -n "start"


# 加载动画
for j in {1..10}; do
    for i in {1..4}; do
        if (($i == 1)); then
            printf '\r-'
        elif (($i == 2)); then
            printf '\r\\'
        elif (($i == 3)); then
            printf '\r|'
        else
            printf '\r/' 
        fi
        sleep 0.5
    done
done


# 进度条
# for i in {1..10}; do
#     printf '#'
#     sleep 0.5
# done


# while true;do
#     for i in '-' "\\" '|' '/';do
#         printf "\r%s" $i
#         sleep 0.2
#     done
# done &


# chars="/-\|"

#while :; do
#  for (( i=0; i<${#chars}; i++ )); do
#    sleep 0.5
#    echo -en "${chars:$i:1}" "\r"
#  done
#done


todo
