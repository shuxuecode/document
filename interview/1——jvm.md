
## JVM内存模式

如图

![](img/jvm-01.png)

- 1、堆：存放对象实例，几乎所有的对象实例都在这里分配内存
- 2、虚拟机栈：虚拟机栈描述的是Java方法执行的内存模型：每个方法被执行的时候都会同时创建一个栈帧（Stack Frame）用于存储局部变量表、操作栈、动态链接、方法出口等信息
- 3、本地方法栈：本地方法栈则是为虚拟机使用到的Native方法服务。
- 4、方法区：存储已被虚拟机加载的类元数据信息(元空间)
- 5、程序计数器：当前线程所执行的字节码的行号指示器


#### 注意，JDK1.8把方法区PermGen（永久代）改为了Metaspace（元空间）

> - 原本永久代存储的数据：符号引用(Symbols)转移到了native heap；字面量(interned strings)转移到了java heap；类的静态变量(class statics)转移到了java heap
> - Metaspace（元空间）存储的是类的元数据信息（metadata）
> - 元空间的本质和永久代类似，都是对JVM规范中方法区的实现。不过元空间与永久代之间最大的区别在于：元空间并不在虚拟机中，而是使用本地内存。
> - 替换的好处：
  一、字符串存在永久代中，容易出现性能问题和内存溢出。
  二、永久代会为 GC 带来不必要的复杂度，并且回收效率偏低
  三、因为固定大小，所以很难进行调优。另外，如果动态加载类过多，也容易产生OOM。
---



### Java堆内存

虚拟机把堆内存划分成新生代（Young Generation）、老年代（Old Generation）和永久代（Permanent Generation）3个区域。

#### 新生代

新生代由 Eden 与 Survivor Space（S0，S1）构成，大小通过-Xmn参数指定，Eden 与 Survivor Space 的内存大小比例默认为8:1，可以通过-XX:SurvivorRatio 参数指定，比如新生代为10M 时，Eden分配8M，S0和S1各分配1M。

- Eden

大多数情况下，对象在Eden中分配，当Eden没有足够空间时，会触发一次Minor GC，虚拟机提供了-XX:+PrintGCDetails参数，告诉虚拟机在发生垃圾回收时打印内存回收日志。

- Survivor：意思为幸存者，是新生代和老年代的缓冲区域。

当新生代发生GC（Minor GC）时，会将存活的对象移动到S0内存区域，并清空Eden区域，当再次发生Minor GC时，将Eden和S0中存活的对象移动到S1内存区域。

存活对象会反复在S0和S1之间移动，当对象从Eden移动到Survivor或者在Survivor之间移动时，对象的GC年龄自动累加，当GC年龄超过默认阈值15时，会将该对象移动到老年代，可以通过参数-XX:MaxTenuringThreshold 对GC年龄的阈值进行设置。

#### 老年代

老年代的空间大小即-Xmx 与-Xmn 两个参数之差，用于存放经过几次Minor GC之后依旧存活的对象。当老年代的空间不足时，会触发Major GC/Full GC，速度一般比Minor GC慢10倍以上。

#### 永久代

在JDK8之前的HotSpot实现中，类的元数据如方法数据、方法信息（字节码，栈和变量大小）、运行时常量池、已确定的符号引用和虚方法表等被保存在永久代中，32位默认永久代的大小为64M，64位默认为85M，可以通过参数-XX:MaxPermSize进行设置，一旦类的元数据超过了永久代大小，就会抛出OOM异常。

虚拟机团队在JDK8的HotSpot中，把永久代从Java堆中移除了，并把类的元数据直接保存在本地内存区域（堆外内存），称之为元空间。



---

## GC垃圾回收

### 对象存活判断方法

判断对象是否存活一般有两种方式：
- 引用计数法
  最简单，最高效，但一般不用它，因为它很难解决对象之间相互循环引用的问题。
- 可达性分析法
    通过一系列成为“GC Roots”的对象作为起始点，从这些点开始向下搜索，当从GCRoots到一个对象不可达，则证明这个对象是不可用的。

#### 在Java语言里，可作为GC Roots对象的包括如下几种：
a.虚拟机栈(栈桢中的本地变量表)中的引用的对象
b.方法区中的类静态属性引用的对象
c.方法区中的常量引用的对象
d.本地方法栈中JNI的引用的对象


### GC算法

- 1、标记-清除算法
  分为“标记”和“清除”两个阶段，它是最基础的收集算法，因为后续的算法都是基于这种思想并对其不足进行改进而得到的。它有两个不足：一是效率问题，二是空间问题，它会产生大量不连续的内存碎片。
- 2、复制算法
  把可用内存划分为大小相等的两块，每次只用其中一块。用完后把存活的对象复制到另一块上，把已使用的一块一次清理掉，这样避免了内存碎片。
- 3、标记-压缩算法（标记-整理算法）
  跟标记-清除算法一样，但后面不是直接对可回收对象清理，而是让存活对象向一端移动，把其它的清理掉。
- 4、分代收集算法
  把内存分为新生代和老年代，采用各自适用的算法。新生代用复制算法，老年代用标记-清除或标记-压缩算法。


### 垃圾回收器

- 串行收集器是最古老，最稳定以及效率高的收集器
- 并行收集器，多线程方式收集
- CMS回收器
  是回收停顿时间比较短，目前比较常用的垃圾回收器。它通过 初始标记、并发标记、重新标记、并发清除 四个步骤完成垃圾回收工作。第1,3步骤依然会引发STW。由于CMS采用的是标记——清除算法，所以会产生大量内存碎片。通过配置参数强制JVM在FGC完成后对老年代进行压缩，执行一次空间碎片整理，但也会引发STW。为了减少STW次数，配置参数，在执行了n次FGC后，JVM再对老年代执行空间碎片整理。
- G1收集器，G1 (Garbage-First)是一款面向服务器的垃圾收集器,主要针对配备多颗处理器及大容量内存的机器. 以极高概率满足GC停顿时间要求的同时,还具备高吞吐量性能特征。



## 类加载机制


###  类加载过程：加载、验证、准备、解析、初始化

如图

![](img/jvm-02.png)

- 加载，查找并加载类的二进制数据，在Java堆中也创建一个java.lang.Class类的对象
- 连接，连接又包含三块内容：验证、准备、解析。
  - 1）验证，文件格式、元数据、字节码、符号引用验证；
  - 2）准备，为类的静态变量分配内存，并将其初始化为默认值；
  - 3）解析，把类中的符号引用转换为直接引用
- 初始化，为类的静态变量赋予正确的初始值


### 双亲委派模型
- 最高一层的类加载器：Bootstrap ClassLoader（启动类加载器），它是在JVM启动时创建的，通过C/C++实现的。
- 扩展类加载器
- 应用类加载器，记载用户定义的ClassPath路径下的类。
- 自定义类加载器。实现步骤：继承ClassLoader，重写findClass（）方法，调用defineClass（）方法。

**双亲委派机制：类加载器收到类加载请求，自己不加载，向上委托给父类加载，父类加载不了，再自己加载。**



## JVM调优原则

### 调优目标
- 将进入老年代的对象数量降到最低
- 减少 Full GC 的执行时间
在同样场景下，采用多个机器上进行参数调整后的比较验证，将验证能够提高性能的参数应用到最终所有服务器上。

### 一般常规
满足下列不需要优化

- Minor GC执行时间不到50ms；
- Minor GC执行不频繁，约10秒一次；
- Full GC执行时间不到1s；
- Full GC执行频率不算频繁，不低于10分钟1次；

### 基本思想
#### 针对JVM堆的设置
一般可以通过-Xms -Xmx限定其最小、最大值，为了防止垃圾收集器在最小、最大之间收缩堆而产生额外的时间，通常把最大、最小设置为相同的值;

#### 年轻代和年老代
根据默认的比例（1：2）分配堆内存， 可以通过调整二者之间的比率NewRadio来调整二者之间的大小。

如年轻代，通过 -XX:newSize -XX:MaxNewSize来设置其绝对大小。同样，为了防止年轻代的堆收缩，我们通常会把-XX:newSize -XX:MaxNewSize设置为同样大小。

##### 年轻代和年老代设置多大才参考：

- 更大的年轻代必然导致更小的年老代，大的年轻代会延长普通GC的周期，但会增加每次GC的时间，小的年老代会导致更频繁的Full GC。

- 更小的年轻代必然导致更大年老代，小的年轻代会导致普通GC很频繁，但每次的GC时间会更短，大的年老代会减少Full GC的频率。

如何选择应该依赖应用程序对象生命周期的分布情况：如果应用存在大量的临时对象，应该选择更大的年轻代；如果存在相对较多的持久对象，年老代应该适当增大。但很多应用都没有这样明显的特性。

在抉择时应该根据以下两点：

- 本着Full GC尽量少的原则，让年老代尽量缓存常用对象，JVM的默认比例1：2也是这个道理 。

- 通过观察应用一段时间，看其他在峰值时年老代会占多少内存，在不影响Full GC的前提下，根据实际情况加大年轻代，比如可以把比例控制在1：1。但应该给年老代至少预留1/3的增长空间。

#### 配置较好的机器
比如多核、大内存机器，可以为年老代选择并行收集算法： -XX:+UseParallelOldGC 。

#### 线程堆栈的设置
每个线程默认会开启1M的堆栈，用于存放栈帧、调用参数、局部变量等，对大多数应用而言这个默认值太了，一般256K就足用。

理论上，在内存不变的情况下，减少每个线程的堆栈，可以产生更多的线程，但这实际上还受限于操作系统。

---
