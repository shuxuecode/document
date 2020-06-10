

## redis显示中文

redis-cli.exe --raw



## 查询key过期时间

keys *          --查询所有key
type keyname    --查询一个key的类型
ttl keyname     --查询一个key的过期剩余秒数，-1表示没有过期时间，-2表示没有这个keyh
pttl keyname    --查询一个key的过期剩余毫秒数
persist keyname --移除key的过期设置



expire keyname seconds                 -- 设置一个key在当前时间"seconds"(秒)之后过期。返回1代表设置成功，返回0代表key不存在或者无法设置过期时间。
pexpire keyname milliseconds           -- 设置一个key在当前时间"milliseconds"(毫秒)之后过期。返回1代表设置成功，返回0代表key不存在或者无法设置过期时间。
expireat keyname timestamp             -- 设置一个key在"timestamp"(时间戳(秒))之后过期。返回1代表设置成功，返回0代表key不存在或者无法设置过期时间。
pexpireat key milliseconds-timestamp   -- 设置一个key在"milliseconds-timestamp"(时间戳(毫秒))之后过期。返回1代表设置成功，返回0代表key不存在或者无法设置过期时间　


setex key "seconds" "value"            -- SETEX在逻辑上等价于SET和EXPIRE合并的操作，区别之处在于SETEX是一条命令，而命令的执行是原子性的，所以不会出现并发问题。



---



---

