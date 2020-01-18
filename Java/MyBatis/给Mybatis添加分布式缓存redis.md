
Mybatis缓存分为一级缓存和二级缓存，先简单说两句一级缓存。

### 一级缓存

Mybatis的一级缓存是指Session级别的缓存，默认开启。作用域是一个SqlSession，也就是在同一个SqlSession中，执行相同的查询SQL，第一次会去数据库进行查询，并写到缓存中，第二次查询是直接去缓存中取的。（当执行SQL查询中间发生了增删改的操作，MyBatis会把SqlSession的缓存清空）。

注意，当Mybatis整合Spring后，直接通过Spring注入Mapper的形式，每个Mapper的每次查询操作都对应一个全新的SqlSession实例，这种情况就不会命中一级缓存了。如果想让一级缓存起作用，可以把相同查询放到一个事务里面，因为一个事务是共用同一个SqlSession的，这样就可以命中一级缓存了。









Mybatis二级缓存默认采用的org.apache.ibatis.cache.impl.PerpetualCache实现的（基于内存中Map<Object, Object> cache），在项目进行分布式部署时，无法保证多实例间的分布式缓存一致性，故需要对该Cache实现进行修改以使之适应分布式部署。

Mybatis支持Ehcache二级缓存配置，默认适用于单实例部署，亦可以支持分布式部署（配置较为复杂，维护困难，支持RMI（手动、自动 - 组播 ）、JGroups、EhCache Server等部署方式）；



因此考虑使用Redis支持分布式缓存，Mybatis官方提供mybatis-redis插件（http://www.mybatis.org/redis-cache/），官方插件需要单独配置/redis.properties并且维护一个JedisConfigPool，考虑到单独配置与项目已有Redis配置重复且无法复用本地配置，因此决定参照官方org.mybatis.caches.redis.RedisCache来重写自己的MybatisRedisCache 。



---