public class RedisLock {

    private static Logger logger = LoggerFactory.getLogger(RedisLock.class);
    private static final long ONE = 1L;

    @Resource
    private RedisClient redisClient;

    /**
     * 加锁
     *
     * @param key
     * @param value
     * @return
     */
    public boolean lock(String key, String value) {
        Long setnx = redisClient.setnx(key, value, 10);
        if (setnx.longValue() == ONE) {
            logger.info("key={}  value={} 得到分布式锁", key, value);
            return true;
        }

        String str = redisClient.readString(key);
        if (str != null && str.equals(value)) {
            logger.info("key={}  value={} 得到分布式锁", key, value);
            return true;
        }
        return false;
    }

    /**
     * 解锁
     *
     * @param key
     * @param value
     */
    public void unlock(String key, String value) {
        logger.info("key={}  value={} 释放分布式锁", key, value);
        String str = redisClient.readString(key);
        if (str != null && str.equals(value)) {
            redisClient.deleteStringKey(key);
            logger.info("key={}  value={} 释放分布式锁成功", key, value);
        }
    }

}

---

private static final Long STATE = 1L;

/**
* distributed lock
*
* @param key
* @param value
* @param seconds
*/
public boolean lock(String key, String value, int seconds) {
    String lockScript = "local key = KEYS[1] \nlocal value = ARGV[1] \nlocal ttl = ARGV[2] \nlocal ok = redis.call('setnx', key, value) \nif ok ==1 then \n redis.call('expire', key, ttl) \nend \nreturn ok";
    try {
        Object res = redisClient.eval(lockScript, Lists.newArrayList(key), Lists.newArrayList(value, String.valueOf(seconds)));
        if (STATE.equals(res)) {
            LOGGER.info("key={}  value={} 得到分布式锁", key, value);
            return true;
        }
        String theValue = redisClient.get(key);
        if (theValue != null && theValue.equals(value)) {
            LOGGER.info("key={}  value={} 得到分布式锁", key, value);
            return true;
        }
    } catch (Exception e) {
        LOGGER.error("获取分布式锁出现异常 {}", e.getMessage(), e);
    }
    return false;
}

/**
* del lock
*
* @param key
* @param value
* @return
*/
public boolean unlock(String key, String value) {
    LOGGER.info("key={}  value={} 释放分布式锁", key, value);
    String unLockScript = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end\n";
    try {
        Object res = redisClient.eval(unLockScript, Lists.newArrayList(key), Lists.newArrayList(value));
        if (STATE.equals(res)) {
            LOGGER.info("key={}  value={} 释放分布式锁成功", key, value);
            return true;
        }
    } catch (Exception e) {
        LOGGER.error("释放分布式锁出现异常 {}", e.getMessage(), e);
    }
    return false;
}