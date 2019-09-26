## windows启动

```
redis-server.exe redis.windows.conf
```


## redis 远程连接

- 一

redis-cli -h ip -p port [-a pwd]

- 二、使用telnet连接redis

telnet <hostname> <port>

连接成功后，如果redis设置了密码，则还需要密码认证，这个时候其实已经和redis建立了通信，使用redis命令auth认证即可：

auth <password>

- 验证

keys *

keys mykey*



#