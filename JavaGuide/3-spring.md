
## spring框架
IOC 和 AOP，
IOC 可以帮助我们管理对象的依赖关系，极大减少对象的耦合性，
而 AOP 的切面编程功能可以更方面的使用动态代理来实现各种动态方法功能（如事务、缓存、日志等）。

## AOP

Spring AOP的实现原理？（基于动态代理模式，如果目标类实现了接口，那么使用基于接口的动态代理，否则使用基于子类/cglib的动态代理）



## 静态代理 和  动态代理？？

动态代理

## bean

作用域

### bean生命周期

Bean的实例化—初始化Bean—使用Bean—Bean的销毁


## bean的初始化过程

beandefinition  重要

getBean

各种校验逻辑

判断是否是单例

- 后置处理器？ 可以自定义很多逻辑处理

## bean

单例变多例
prototype ？

## 解决循环依赖

Spring是先将Bean对象实例化之后再设置对象属性

![](2020-10-19-14-55-07.png)

Spring先是用构造实例化Bean对象 ，此时Spring会将这个实例化结束的对象放到一个Map中，并且Spring提供了获取这个未设置属性的实例化对象引用的方法。   结合我们的实例来看，，当Spring实例化了StudentA、StudentB、StudentC后，紧接着会去设置对象的属性，此时StudentA依赖StudentB，就会去Map中取出存在里面的单例StudentB对象，以此类推，不会出来循环的问题

三级缓存？？

## 自定义注解

### @Autowired
默认按类型装配，默认情况下必须要求依赖对象存在，如果要允许null值，可以设置它的required属性为false。如果想使用名称装配可以结合@Qualifier注解进行使用。

### @Resource
默认按照名称进行装配，名称可以通过name属性进行指定，如果没有指定name属性，当注解写在字段上时，默认取字段名进行名称查找。如果注解写在setter方法上默认取属性名进行装配。当找不到与名称匹配的bean时才按照类型进行装配。但是需要注意的是，如果name属性一旦指定，就只会按照名称进行装配。



## 事务

---

- 三级缓存
- applicationContext BeanFactory 的区别