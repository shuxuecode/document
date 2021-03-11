## 面向对象三大特性：继承、封装、多态







## 并发包  JUC

> JUC包中的原子类如何保证原子性？（CAS机制和自旋锁）

根据操作的数据类型，可以将JUC包中的原子类分为4类

### 基本类型

使用原子的方式更新基本类型

AtomicInteger：整形原子类

AtomicLong：长整型原子类

AtomicBoolean ：布尔型原子类



### 数组类型

使用原子的方式更新数组里的某个元素

AtomicIntegerArray：整形数组原子类

AtomicLongArray：长整形数组原子类

AtomicReferenceArray ：引用类型数组原子类

### 引用类型

AtomicReference：引用类型原子类

AtomicStampedRerence：原子更新引用类型里的字段原子类

AtomicMarkableReference ：原子更新带有标记位的引用类型

### 对象的属性修改类型

AtomicIntegerFieldUpdater:原子更新整形字段的更新器

AtomicLongFieldUpdater：原子更新长整形字段的更新器

AtomicStampedReference ：原子更新带有版本号的引用类型。该类将整数值与引用关联起来，可用于解决原子的更新数据和数据的版本号，可以解决使用 CAS 进行原子更新时可能出现的 ABA 问题。




## ThreadLocal

出现异常时怎么确保finally执行



---

volatile如何保证可见性（MESI缓存一致性协议）

volatile如何保证有序性（内存屏障——lock前缀指令）

synchronized和volatile的区别（volatile是一种非锁机制，这种机制可以避免锁机制引起的线程上下文切换和调度问题。因此，volatile的执行成本比synchronized更低；volatile只能保证可见性有序性；synchronized可以保证原子性可见性有序性）

---

## 	CAS



CAS机制，会引发什么问题，如何解决ABA问题？（CAS会导致ABA问题，解决ABA问题是使用版本号机制）

---

##  AQS ?


## 锁



悲观锁和乐观锁的区别，应用？（java中的Synchronized关键字和lock锁使用的都是悲观锁；CAS机制是乐观锁的一种实现方式）

公平锁和非公平锁（公平锁按照先来先服务，不会出现饥饿；非公平锁会导致饥饿，但是效率更高，默认的锁都是非公平的）

自旋锁和互斥锁，自旋锁的优缺点？（优点：减少上下文切换和用户态内核态的切换带来的开销；缺点：循环等待消耗CPU）

可重入锁和不可重入锁（不可重入锁容易导致死锁发生，大多数锁都是可重入的，例如Synchronized锁和ReentrantLock）

### 死锁产生的四个必要条件以及死锁的处理策略



---



## java8新特性

- ## Lambda表达式和函数式接口

- ## 接口的默认方法和静态方法

- ## 方法引用

- ## 重复注解

  - 在Java 8中使用**@Repeatable**注解定义重复注解

- ## 拓宽注解的应用场景

  - Java 8拓宽了注解的应用场景。现在，注解几乎可以使用在任何元素上：局部变量、接口类型、超类和接口实现类，甚至可以用在函数的异常定义上。

- ## Optional

- ## Streams

- Date/Time API

  

- ## Nashorn JavaScript引擎

  - Java 8提供了新的[Nashorn JavaScript引擎](http://www.javacodegeeks.com/2014/02/java-8-compiling-lambda-expressions-in-the-new-nashorn-js-engine.html)，使得我们可以在JVM上开发和运行JS应用。Nashorn JavaScript引擎是javax.script.ScriptEngine的另一个实现版本，这类Script引擎遵循相同的规则，允许Java和JavaScript交互使用，

- ## Base64

  - [对Base64编码的支持](http://www.javacodegeeks.com/2014/04/base64-in-java-8-its-not-too-late-to-join-in-the-fun.html)已经被加入到Java 8官方库中，这样不需要使用第三方库就可以进行Base64编码

- ## 并行数组

  - Java8版本新增了很多新的方法，用于支持并行数组处理。最重要的方法是**parallelSort()**，可以显著加快多核机器上的数组排序。



优化了HashMap和ConcurrentHashMap





@FunctionalInterface 注解  ？？



---

## 注解的实现原理





---

整型 4

byte 8位

short 16位

int 32位

long 64位

浮点型 2

float 32位

double 64位

字符型 1

布尔型 1



