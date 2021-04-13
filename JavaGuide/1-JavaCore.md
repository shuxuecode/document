## 面向对象三大特性：继承、封装、多态


## 枚举




## synchronized



## volatile


volatile如何保证可见性（MESI缓存一致性协议）

volatile如何保证有序性（内存屏障——lock前缀指令）

synchronized和volatile的区别（volatile是一种非锁机制，这种机制可以避免锁机制引起的线程上下文切换和调度问题。因此，volatile的执行成本比synchronized更低；volatile只能保证可见性有序性；synchronized可以保证原子性可见性有序性）

### volatile和synchronized的区别:

- volatile关键字解决的是变量在多个线程之间的可见性（对于用volatile修饰的变量，JVM虚拟机只是保证从主内存加载到线程工作内存的值是最新的）；而sychronized关键字解决的是多个线程之间访问共享资源的同步性。 
- volatile仅能使用在变量级别；synchronized则可以使用在变量、方法、和类级别的；
- volatile仅能实现变量的修改可见性，不能保证原子性；而synchronized则可以保证变量的修改可见性和原子性
- volatile不会造成线程的阻塞；synchronized可能会造成线程的阻塞。
- volatile修饰变量适合于一写多读的并发场景，而多写场景一定会产生线程安全问题（因此使用volatile而不是synchronized的唯一安全情况是类中只有一个可变的域）。
- 因为所有的操作都需要同步给内存变量，所以volatile一定会使线程的执行速度变慢。

---

### synchronized和lock区别：

1）Lock是一个接口，而synchronized是Java中的关键字，synchronized是内置的语言实现；
2）synchronized在发生异常时，会自动释放线程占有的锁，因此不会导致死锁现象发生；而Lock在发生异常时，如果没有主动通过unLock()去释放锁，则很可能造成死锁现象，因此使用Lock时需要在finally块中释放锁；
3）Lock可以让等待锁的线程响应中断，而synchronized却不行，使用synchronized时，等待的线程会一直等待下去，不能够响应中断；
4）通过Lock可以知道有没有成功获取锁，而synchronized却无法办到。
5）Lock可以提高多个线程进行读操作的效率（读写锁）。

> 在性能上来说，如果竞争资源不激烈，两者的性能是差不多的，而当竞争资源非常激烈时（即有大量线程同时竞争），此时Lock的性能要远远优于synchronized。所以说，在具体使用时要根据适当情况选择。 


## ReentrantLock  todo


## CountDownLatch  CyclicBarrier  Semaphore

countDownLatch的await方法是否安全？怎么改造？

## Exchange ？？

两个线程间的数据交换

## Unsafe类


## JUC包下面的原子类

## ThreadLocal






---

## 	CAS  (Compare And Swap)

CAS机制，会引发什么问题，如何解决ABA问题？（CAS会导致ABA问题，解决ABA问题是使用版本号机制）

使用AtomicStampedReference解决ABA问题



---

##  AQS原理   AbstractQueuedSynchronizer

![](img/2021-04-13-20-55-46.png)

维护了一个volatile int state（代表共享资源）和一个FIFO线程等待队列（多线程争用资源被阻塞时会进入此队列）。
state的访问方式有三种:
getState()
setState()
compareAndSetState()


### 工作机制：
AQS的等待队列是基于链表实现的FIFO的等待队列，队列每个节点只关心其前驱节点的状态，线程唤醒时只唤醒队头等待线程（即head的后继节点，并且等待状态不大于0）


### 两种资源共享方式
AQS定义两种资源共享方式：Exclusive（独占，只有一个线程能执行，如ReentrantLock）和Share（共享，多个线程可同时执行，如Semaphore/CountDownLatch）。

#### 独占
只有一个线程能执行，如 ReentrantLock。又可分为公平锁和非公平锁,ReentrantLock 同时支持两种锁,下面以 ReentrantLock 对这两种锁的定义做介绍：

**公平锁：**  按照线程在队列中的排队顺序，先到者先拿到锁
**非公平锁：**  当线程要获取锁时，先通过两次 CAS 操作去抢锁，如果没抢到，当前线程再加入到队列中等待唤醒。


#### 共享
多个线程可同时执行，如 Semaphore/CountDownLatch。Semaphore、CountDownLatCh、CyclicBarrier、ReadWriteLock 我们都会在后面讲到。

ReentrantReadWriteLock 可以看成是组合式，因为ReentrantReadWriteLock 也就是读写锁允许多个线程同时对某一资源进行读。


执行过程？


## 锁  ***

悲观锁和乐观锁的区别，应用？（java中的Synchronized关键字和lock锁使用的都是悲观锁；CAS机制是乐观锁的一种实现方式）

公平锁和非公平锁（公平锁按照先来先服务，不会出现饥饿；非公平锁会导致饥饿，但是效率更高，默认的锁都是非公平的）

自旋锁和互斥锁，自旋锁的优缺点？（优点：减少上下文切换和用户态内核态的切换带来的开销；缺点：循环等待消耗CPU）

可重入锁和不可重入锁（不可重入锁容易导致死锁发生，大多数锁都是可重入的，例如Synchronized锁和ReentrantLock）

锁偏向？

轻量级锁？


### 死锁产生的四个必要条件以及死锁的处理策略

1、互斥条件：一个资源每次只能被一个进程使用。
2、不可抢占：进程已获得的资源，在末使用完之前，不能强行剥夺，只能在进程使用完时由自己释放。
3、占有且申请：一个进程因请求资源而阻塞时，对已获得的资源保持不放。
4、循环等待：若干进程之间形成一种头尾相接的循环等待资源关系。


---



## future  ？

futureTask


## 对象的深浅复制？


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



## Final, finally, finalize的区别？

- final：他是用来进行修饰方法、类、以及属性变量的，如果修饰的是方法的话，表示方法不能够被覆盖，如果修饰的是类的话，就表示该类不能够被继承，如果修饰的是属性变量的话，就表示该属性变量不能够被修改。

- finally：他一般用来进行try 。。catch语句之后，主要是为了进行释放一些连接资源，无论怎么finally中的代码都会被执行。

- finalize：这个方法是Object对象的protected修饰的方法，当虚拟机在进行回收一个对象之前的时候，会去调用该对象的finalize（）方法，这个方法只能是被动的被调用，就算是我们主动去调用该方法去回收一个对象，也不会起到作用的，因为他是有虚拟机自己去决定的。



---

## 

整型 4

byte 8位

short 16位

int 32位

long 64位

浮点型 2

float 32位

double 64位

字符型 1  char

布尔型 1   boolean

---

String不可变

1. 缓存hash值，hash值经常被使用，例如HashMap的key，不可变这样只需计算一次hash值即可。

2. 字符串常量池 （String Pool），如果一个String对象已被创建过了，则直接从String Pool中取用即可。

   ```java
   System.out.println(new String("a") == new String("a")); // false
   System.out.println("a" == "a"); // true
   ```

   - "a" 这种字面量的形式创建字符串，会自动地将字符串放入 String Pool 中，所以==为true

   - new String("a")这种方式会创建两个字符串对象（前提是池子里没有"a"字符串对象）,一个是放到常量池中的“a”字符串字面量，一个是new方式在堆中创建的字符串对象。

   在 Java 7 之前，String Pool 被放在运行时常量池中，它属于永久代。而在 Java 7，String Pool 被移到堆中。这是因为永久代的空间有限，在大量使用字符串的场景下会导致 OutOfMemoryError 错误。

3. 线程安全，可以在多个线程中安全的使用。

---

## 参数传递（按值传递、按引用传递）

Java 的参数是以值传递的形式传入方法中，而不是引用传递。
以下代码中 Dog dog 的 dog 是一个指针，存储的是对象的地址。在将一个参数传入一个方法时，本质上是将对象的地址以值的方式传递到形参中。因此在方法中使指针引用其它对象，那么这两个指针此时指向的是完全不同的对象，在一方改变其所指向对象的内容时对另一方没有影响。

```
public class Dog {

    String name;

    Dog(String name) {
        this.name = name;
    }

    String getName() {
        return this.name;
    }

    void setName(String name) {
        this.name = name;
    }

    String getObjectAddress() {
        return super.toString();
    }
}
```


```
public class PassByValueExample {
    public static void main(String[] args) {
        Dog dog = new Dog("A");
        System.out.println(dog.getObjectAddress()); // Dog@4554617c
        func(dog);
        System.out.println(dog.getObjectAddress()); // Dog@4554617c
        System.out.println(dog.getName());          // A
    }

    private static void func(Dog dog) {
        System.out.println(dog.getObjectAddress()); // Dog@4554617c
        dog = new Dog("B");
        System.out.println(dog.getObjectAddress()); // Dog@74a14482
        System.out.println(dog.getName());          // B
    }
}
```

如果在方法中改变对象的字段值会改变原对象该字段值，因为改变的是同一个地址指向的内容。

```
class PassByValueExample {
    public static void main(String[] args) {
        Dog dog = new Dog("A");
        func(dog);
        System.out.println(dog.getName());          // B
    }

    private static void func(Dog dog) {
        dog.setName("B");
    }
}
```


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





---

