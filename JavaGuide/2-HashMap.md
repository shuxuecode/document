


## 扩容机制

拆分元素的过程中，原jdk1.7中会需要重新计算哈希值，但是到jdk1.8中已经进行优化，不在需要重新计算，提升了拆分的性能，设计的还是非常巧妙的。

原哈希值与扩容新增出来的长度16，进行&运算，如果值等于0，则下标位置不变。如果不为0，那么新的位置则是原来位置上加16。



## 扩容因子  0.75
加载因子表示Hash表中元素的填满程度
加载因子 = 填入表中的元素个数 / 散列表的长度
加载因子越大，填满的元素越多，空间利用率越高，但发生冲突的机会变大了；
加载因子越小，填满的元素越少，冲突发生的机会减小，但空间浪费了更多了，而且还会提高扩容rehash操作的次数。
冲突的机会越大，说明需要查找的数据还需要通过另一个途径查找，这样查找的成本就越高。因此，必须在“冲突的机会”与“空间利用率”之间，寻找一种平衡与折衷。

HashMap解决hash冲突的方式是链地址法。


**泊松分布**
泊松分布是统计学和概率学常见的离散概率分布，适用于描述单位时间内随机事件发生的次数的概率分布。



## 哈希冲突
> 解决哈希表的冲突的方法：**开放地址法**和**链地址法**
> 开放地址法 的基本思想是：当发生地址冲突时，按照某种方法继续探测哈希表中的其他存储单元，直到找到空位置为止。


## 一致性哈希算法 

按照常用的hash算法来将对应的key哈希到一个具有2^32次方个桶的空间中

通过引入虚拟节点，以解决hash环偏斜的问题

> 自己实现一致性hash

> redis cluster 拥有固定的16384个slot

## get put 的伪代码

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


## put

```
// 将“key-value”添加到HashMap中
public V put(K key, V value) {
    // 若“key为null”，则将该键值对添加到table[0]中。
    if (key == null)
        return putForNullKey(value);
    // 若“key不为null”，则计算该key的哈希值，然后将其添加到该哈希值对应的链表中。
        // 1. 求 key 的 hash 值
    int hash = hash(key.hashCode());
    // 2. 找到对应的数组下标
    int i = indexFor(hash, table.length);

    // 3. 遍历一下对应下标处的链表，看是否有重复的 key 已经存在
    //    如果有，直接覆盖，put 方法返回旧值就结束了
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

如果key为null，则将其添加到table[0]对应的链表中，如果key不为null，则同样先求出key的hash值，根据hash值得出在table中的索引，而后遍历对应的单链表，如果单链表中存在与目标key相等的键值对，则将新的value覆盖旧的value，且将旧的value返回，如果找不到与目标key相等的键值对，或者该单链表为空，则将该键值对插入到单链表的头节点位置（每次新插入的节点都是放在头节点的位置），该操作是有addEntry方法实现的，它的源码如下：

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



## 扩容的伪代码 ？？

> 当容量一定是2^n时，h & (length - 1) == h % length ， 计算位置，位运算，高效

---


## 为什么使用红黑树？而不用其它类型的树

在jdk1.8中引入红黑树以解决链表过长的问题

其它树比红黑树更难平衡，需要更多的旋转次数

- 链表长度大于8转化为红黑树，小于6红黑树转化为链表；为什么不直接设置成大于8转化成红黑树，小于8转化成链表；（中间有个差值7进行过渡是为了避免链表和树频繁转换，如果一个HashMap不停的插入、删除元素，链表个数在8左右徘徊，就会频繁的发生树转链表、链表转树，效率会很低）

- 把链表转化为红黑树的阈值是8，为什么不设置成其他值？（遵循泊松分布，链表长度超过8的概率非常小）

- HashMap扩容机制，即resize方法？（JDK 1.7 会重新计算每个元素的哈希值，JDK1.8是通过高位运算（e.hash & oldCap）来确定元素是否需要移动，如果运算结果值为0，那么元素扩容后位置不变，结果值为1表示元素在扩容时位置发生了变化，新的下标位置等于原下标位置 + 原数组长度）

- HashMap为什么是线程不安全的？（同时新增元素、同时扩容导致数据丢失，jdk1.7头部倒序插入出现死循环导致CPU占用100%）

- HashMap发生哈希冲突，新节点是插入到链表头部还是链表的尾部，头部倒序插入死循环是怎么产生的？（jdk1.7采用头部倒序插入，会导致死循环；jdk1.8使用尾部正序插入）

- ConcurrentHashMap底层采用的结构（分jdk1.7和jdk1.8），jdk1.7和jdk1.8分别采用什么方式实现线程安全？（jdk1.7采用分段锁，也就是为每一个segment加上ReentrantLock锁；jdk1.8使用的是CAS机制加上synchronized锁）


## 链表转红黑树的过程

`treeifyBin`,是一个链表转树的方法，但不是所有的链表长度为8后都会转成树，还需要判断存放key值的数组桶长度是否小于64 `MIN_TREEIFY_CAPACITY`。如果小于则需要扩容，扩容后链表上的数据会被拆分散列的相应的桶节点上，也就把链表长度缩短了。


## 红黑树
五条性质：
1. 节点是红色或者黑色
2. 根节点是黑色
3. 每个叶节点（NIL或空节点）是黑色
4. 每个红色节点的两个子节点都是黑色的（也就是说不存在两个连续的红色节点）；
5. 从根节点到每一个NIL节点的路径中，都包含了相同数量的黑色节点





## HashMap在Java1.7与1.8中的区别：

JDK1.7中使用一个Entry数组来存储数据，用key的hashcode取模来决定key会被放到数组里的位置，如果hashcode相同，或者hashcode取模后的结果相同（hash collision），那么这些key会被定位到Entry数组的同一个格子里，这些key会形成一个链表。在hashcode特别差的情况下，比方说所有key的hashcode都相同，这个链表可能会很长，那么put/get操作都可能需要遍历这个链表。也就是说时间复杂度在最差情况下会退化到O(n)。

JDK1.8中使用一个Node数组来存储数据，但这个Node可能是链表结构，也可能是红黑树结构。如果插入的key的hashcode相同，那么这些key也会被定位到Node数组的同一个格子里。如果同一个格子里的key不超过8个，使用链表结构存储。如果超过了8个，那么会调用treeifyBin函数，将链表转换为红黑树。那么即使hashcode完全相同，由于红黑树的特点，查找某个特定元素，也只需要O(log n)的开销。也就是说put/get的操作的时间复杂度最差只有O(log n)。

 
## ConcurrentHashMap在Java1.7与1.8中的区别：

ConcurrentHashMap在jdk1.7中采用Segment + HashEntry的方式进行实现；1.8中放弃了Segment臃肿的设计，取而代之的是采用Node + CAS + Synchronized来保证并发安全进行实现


## ConcurrentSkipListMap

HashMap是线程不安全的，而ConcurrentHashMap和ConcurrentSkipListMap是线程安全的，它们内部都使用无锁CAS算法实现了同步。ConcurrentHashMap中的元素是无序的，ConcurrentSkipListMap中的元素是有序的。

## HashTable
- 底层数据结构：HashTable基于Dictionary类，而HashMap是基于AbstractMap。
- HashTable中的key和value都不允许为null
- 是线程安全的，它的每个方法中都加入了Synchronize方法。

## TreeMap
- 基于红黑树的NavigableMap实现

方法：
- Object firstKey（）：它返回树映射中当前的第一个（最少）键。
- Object lastKey（）：它返回树映射中当前的最后一个（最大）键。
- Object ceilingKey（Object key）：返回大于或等于给定键的最小键，如果没有这样的键则返回null。
- Object higherKey（Object key）：返回严格大于指定键的最小键。

## LinkedHashMap
LinkedHashMap是继承于HashMap，是基于HashMap和双向链表来实现的。
LinkedHashMap有序，可分为插入顺序和访问顺序两种。

## HashSet的底层实现
基于HashMap来实现的

new 一个 HashSet对象底层实际就是new了一个HashMap，并且使用默认的初始容量16和默认的加载因子0.75；当我们往HashSet里面添加一个元素其实就是往HashMap里面put了一个元素，并且是以key存在的，HashMap的value值都是一样的，是一个静态常量PRESENT，源码为：`private static final Object PRESENT = new Object();` ）

---

### 线程安全的List有哪些？
（Vector、CopyOnWriteArrayList、还可以使用Collections类的synchronizedList方法将线程不安全的List转为线程安全的）

### 为什么ArrayList查询速度快？
（ArrayList底层是基于数组实现，可以根据元素下标进行查询，查询方式为（数组首地址+元素长度*下标，基于这个位置读取相应的字节数就可以了），如果数组存的是对象，怎么根据下标定位元素所在位置？（对象数组每个元素存放的是对象的引用，而引用类型如果开启指针压缩占用4字节，不开启则占用8字节，所以对象数组同样适用上面的公式）

### ArrayList的扩容？
（ArrayList底层是基于数组实现，所以创建ArrayList会给数组指定一个初始容量，默认值为10，因为必须指明数组的长度才能给数组分配空间；由于数组的特性，ArrayList扩容是创建一个更大的数组，然后将原来的元素拷贝到更大的数组中，扩容的核心方法是Arrays.copyOf方法）

## LinkedList ？？

---

## CopyOnWriteArrayList

底层实现添加的原理是先copy出一个容器(可以简称副本)，再往新的容器里添加这个新的数据，最后把新的容器的引用地址赋值给了之前那个旧的的容器地址，但是在添加这个数据的期间，其他线程如果要去读取数据，仍然是读取到旧的容器里的数据。

缺点:
1. **内存占有问题**:很明显，两个数组同时驻扎在内存中，如果实际应用中，数据比较多，而且比较大的情况下，占用内存会比较大，针对这个其实可以用ConcurrentHashMap来代替。
2. **数据一致性**:CopyOnWrite容器只能保证数据的最终一致性，不能保证数据的实时一致性。所以如果你希望写入的的数据，马上能读到，请不要使用CopyOnWrite容器


CopyOnWriteArrayList : 写时加锁，当添加一个元素的时候，将原来的容器进行copy，复制出一个新的容器，然后在新的容器里面写，写完之后再将原容器的引用指向新的容器，而读的时候是读旧容器的数据，所以可以进行并发的读，但这是一种弱一致性的策略。使用场景：CopyOnWriteArrayList适合使用在读操作远远大于写操作的场景里，比如缓存。


