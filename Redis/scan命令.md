
> 查找key时如果用keys命令会导致阻塞，由于Redis单线程这一特性，keys命令是以阻塞的方式执行的，keys是以遍历的方式实现的复杂度是 O(n），Redis库中的key越多，查找实现代价越大，产生的阻塞时间越长。

> scan命令是以非阻塞的方式查找key

## scan的语法为：

```
SCAN cursor [MATCH pattern] [COUNT count] The default COUNT value is 10.
```

SCAN命令是一个基于游标的迭代器。这意味着命令每次被调用都需要使用上一次这个调用返回的游标作为该次调用的游标参数，以此来延续之前的迭代过程。
这里使用scan 0 match key1111* count 20命令来完成这个查询，稍显意外的是，使用一开始都没有查询到结果，这个要从scan命令的原理来看。
scan在遍历key的时候，0就代表第一次，key1111*代表按照key1111开头的模式匹配，count 20中的20并不是代表输出符合条件的key，而是限定服务器单次遍历的字典槽位数量(约等于)。

COUNT是指本次遍历时, 要遍历多少个元素; 然后再将COUNT个元素中符合pattern的元素返回



### scan 指令是一系列指令，除了可以遍历所有的 key 之外，还可以对指定的容器集合进行遍历。
- zscan 遍历 zset 集合元素，
- hscan 遍历 hash 字典的元素、
- sscan 遍历 set 集合的元素。




---
> 参考：https://www.cnblogs.com/wy123/p/10955153.html
