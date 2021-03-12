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

## 参数传递

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


---

