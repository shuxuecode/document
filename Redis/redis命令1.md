
## 查询key过期时间

keys *          --查询所有key
type keyname    --查询一个key的类型
ttl keyname     --查询一个key的过期剩余秒数，-1表示没有过期时间，-2表示没有这个keyh
pttl keyname    --查询一个key的过期剩余毫秒数
persist keyname --移除key的过期设置

---



---