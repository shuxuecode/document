
## sorted set 命令

## RPUSH

RPUSH key value

## LRANGE 

查询所有

LRANGE key 0 -1

## LTRIM
对一个列表进行修剪(trim)，就是说，让列表只保留指定区间内的元素，不在指定区间之内的元素都将被删除。

下标 0 表示列表的第一个元素，以 1 表示列表的第二个元素，以此类推。 你也可以使用负数下标，以 -1 表示列表的最后一个元素， -2 表示列表的倒数第二个元素，以此类推。 

基本语法如下：
```s
redis 127.0.0.1:6379> LTRIM KEY_NAME START STOP
```




