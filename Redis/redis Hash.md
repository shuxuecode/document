



## HMSET key field1 value1 [field2 value2 ]
同时将多个 field-value (域-值)对设置到哈希表 key 中。

```shell
hmset zhao name zsx age 18 num 1
```


## HSET key field value
将哈希表 key 中的字段 field 的值设为 value 。

```shell
hset zhao a 0
```


## HGETALL key
获取在哈希表中指定 key 的所有字段和值

```shell
hgetall zhao
```


## HGET key field
获取存储在哈希表中指定字段的值。

```shell
hget zhao num
```


## HINCRBY key field increment
为哈希表 key 中的指定字段的整数值加上增量 increment 。

```shell
hincrby zhao num 1
```

## HMGET key field1 [field2]
获取所有给定字段的值

```shell
hmget zhao num a
```








```shell

```