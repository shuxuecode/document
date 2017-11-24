ps -aux | grep java

top -Hp pid

- TIME列就是各个Java线程耗费的CPU时间

## 将线程pid转化成16进制

printf '%x\n' 32698

## 输出进程32665的堆栈信息，然后根据线程ID的十六进制值grep

jstack 32665 | grep 7fba

## 查看pid=32665进程  所有的堆栈信息

jstack -l 32665

## 导出线程信息

jstack 进程id > ps.txt

