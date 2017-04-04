
## Java 中有四种常见的Map实现——HashMap, TreeMap, Hashtable和LinkedHashMap：

- HashMap就是一张hash表，键和值都没有排序。
- TreeMap以红黑树结构为基础，键值可以设置按某种顺序排列。
- LinkedHashMap保存了插入时的顺序。
- Hashtable是同步的(而HashMap是不同步的)。所以如果在线程安全的环境下应该多使用HashMap，而不是Hashtable，因为Hashtable对同步有额外的开销，不过JDK 5之后的版本可以使用conncurrentHashMao代替HashTable。

## get

```

// 获取key对应的value
    public V get(Object key) {
        if (key == null)
            return getForNullKey();
        // 获取key的hash值
        int hash = hash(key.hashCode());
        // 在“该hash值对应的链表”上查找“键值等于key”的元素
        for (Entry<K, V> e = table[indexFor(hash, table.length)]; e != null; e = e.next) {
            Object k;
            // 判断key是否相同
            if (e.hash == hash && ((k = e.key) == key || key.equals(k)))
                return e.value;
        }
        // 没找到则返回null
        return null;
    }

```

如果key不为null，则先求的key的hash值，根据hash值找到在table中的索引，在该索引对应的单链表中查找是否有键值对的key与目标key相等，有就返回对应的value，没有则返回null。

## PUT

````

// 将“key-value”添加到HashMap中
    public V put(K key, V value) {
        // 若“key为null”，则将该键值对添加到table[0]中。
        if (key == null)
            return putForNullKey(value);
        // 若“key不为null”，则计算该key的哈希值，然后将其添加到该哈希值对应的链表中。
        int hash = hash(key.hashCode());
        int i = indexFor(hash, table.length);
        for (Entry<K, V> e = table[i]; e != null; e = e.next) {
            Object k;
            // 若“该key”对应的键值对已经存在，则用新的value取代旧的value。然后退出！
            if (e.hash == hash && ((k = e.key) == key || key.equals(k))) {
                V oldValue = e.value;
                e.value = value;
                e.recordAccess(this);
                return oldValue;
            }
        }

        // 若“该key”对应的键值对不存在，则将“key-value”添加到table中
        modCount++;
        // 将key-value添加到table[i]处
        addEntry(hash, key, value, i);
        return null;
    }


```

如果key为null，则将其添加到table[0]对应的链表中，如果key不为null，则同样先求出key的hash值，根据hash值得出在table中的索引，而后遍历对应的单链表，如果单链表中存在与目标key相等的键值对，则将新的value覆盖旧的value，且将旧的value返回，如果找不到与目标key相等的键值对，或者该单链表为空，则将该键值对插入到单链表的头结点位置（每次新插入的节点都是放在头结点的位置），该操作是有addEntry方法实现的，它的源码如下：

```

// 新增Entry。将“key-value”插入指定位置，bucketIndex是位置索引。
    void addEntry(int hash, K key, V value, int bucketIndex) {
        // 保存“bucketIndex”位置的值到“e”中
        Entry<K, V> e = table[bucketIndex];
        // 设置“bucketIndex”位置的元素为“新Entry”，
        // 设置“e”为“新Entry的下一个节点”
        table[bucketIndex] = new Entry<K, V>(hash, key, value, e);
        // 若HashMap的实际大小 不小于 “阈值”，则调整HashMap的大小
        if (size++ >= threshold)
            resize(2 * table.length);
    }


```


## 重点来分析下求hash值和索引值的方法，这两个方法便是HashMap设计的最为核心的部分，二者结合能保证哈希表中的元素尽可能均匀地散列。

### 由hash值找到对应索引的方法如下

```

static int indexFor(int h, int length) {
        return h & (length-1);
     }

```

因为容量初始还是设定都会转化为2的幂次。故可以使用高效的位与运算替代模运算。下面会解释原因。

### 计算hash值的方法如下

````

static int hash(int h) {
            h ^= (h >>> 20) ^ (h >>> 12);
            return h ^ (h >>> 7) ^ (h >>> 4);
        }

```



## HashMap中则通过 h&(length-1) 的方法来代替取模，其中h是key的hash值，同样实现了均匀的散列，但效率要高很多，这也是HashMap对Hashtable的一个改进。



## 为什么HashMap是线程不安全的，实际会如何体现？

第一，如果多个线程同时使用put方法添加元素

假设正好存在两个put的key发生了碰撞(hash值一样)，那么根据HashMap的实现，这两个key会添加到数组的同一个位置，这样最终就会发生其中一个线程的put的数据被覆盖。

第二，如果多个线程同时检测到元素个数超过数组大小*loadFactor

这样会发生多个线程同时对hash数组进行扩容，都在重新计算元素位置以及复制数据，但是最终只有一个线程扩容后的数组会赋给table，也就是说其他线程的都会丢失，并且各自线程put的数据也丢失。且会引起死循环的错误。


## HashMap可以通过下面的语句进行同步：

Collections.synchronizeMap(hashMap);
