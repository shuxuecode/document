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



## redis三个框架 Jedis,Redisson,Lettuce

概念：

　　Jedis：是Redis的Java实现客户端，提供了比较全面的Redis命令的支持，

　　Redisson：实现了分布式和可扩展的Java数据结构。

　　Lettuce：高级Redis客户端，用于线程安全同步，异步和响应使用，支持集群，Sentinel，管道和编码器。

优点：

　　Jedis：比较全面的提供了Redis的操作特性

　　Redisson：促使使用者对Redis的关注分离，提供很多分布式相关操作服务，例如，分布式锁，分布式集合，可通过Redis支持延迟队列

　　Lettuce：主要在一些分布式缓存框架上使用比较多

可伸缩：

Jedis：使用阻塞的I/O，且其方法调用都是同步的，程序流需要等到sockets处理完I/O才能执行，不支持异步。Jedis客户端实例不是线程安全的，所以需要通过连接池来使用Jedis。

Redisson：基于Netty框架的事件驱动的通信层，其方法调用是异步的。Redisson的API是线程安全的，所以可以操作单个Redisson连接来完成各种操作

Lettuce：基于Netty框架的事件驱动的通信层，其方法调用是异步的。Lettuce的API是线程安全的，所以可以操作单个Lettuce连接来完成各种操作

 

## jedis 使用示例

<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>4.4.3</version> <!-- 使用最新版本 -->
</dependency>

import redis.clients.jedis.Jedis;

public class JedisExample {
    public static void main(String[] args) {
        // 创建连接
        Jedis jedis = new Jedis("localhost", 6379); // 默认端口6379
        
        // 认证（如果设置了密码）
        // jedis.auth("password");
        
        // 测试连接
        System.out.println("连接成功");
        System.out.println("服务正在运行: " + jedis.ping());
        
        // 关闭连接
        jedis.close();
    }
}

import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

public class JedisPoolExample {
    public static void main(String[] args) {
        // 配置连接池
        JedisPoolConfig poolConfig = new JedisPoolConfig();
        poolConfig.setMaxTotal(128); // 最大连接数
        poolConfig.setMaxIdle(32);  // 最大空闲连接数
        poolConfig.setMinIdle(8);   // 最小空闲连接数
        
        // 创建连接池
        JedisPool jedisPool = new JedisPool(poolConfig, "localhost", 6379);
        
        try (Jedis jedis = jedisPool.getResource()) {
            // 执行操作
            jedis.set("poolKey", "poolValue");
            System.out.println(jedis.get("poolKey")); // 输出: poolValue
        }
        
        // 关闭连接池
        jedisPool.close();
    }
}

try (Jedis jedis = jedisPool.getResource()) {
    // 开启事务
    Transaction tx = jedis.multi();
    
    try {
        tx.set("txKey1", "value1");
        tx.incr("counter");
        tx.set("txKey2", "value2");
        
        // 执行事务
        tx.exec();
    } catch (Exception e) {
        // 取消事务
        tx.discard();
        e.printStackTrace();
    }
}

---