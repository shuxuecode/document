> 1、本项目由maven管理
> 2、配置中包含了本地环境的一些配置，如果在你的机子上报错，请删除这部分配置代码即可
> 3、源码已全部发布到Github - [https://github.com/zhaoshuxue/ssh](https://github.com/zhaoshuxue/ssh)中了，欢迎下载（star）

## 一、创建maven  WEB项目，配置pom.xml文件

直接上代码

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" 
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd ">
	<modelVersion>4.0.0</modelVersion>
	<groupId>com</groupId>
	<artifactId>ssh</artifactId>
	<packaging>war</packaging>
	<version>0.0.1-SNAPSHOT</version>
	<name>zsx Maven Webapp</name>
	<url>http://maven.apache.org</url>

	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<jdk.version>1.7</jdk.version>
		<!-- spring版本号 -->
		<spring.version>4.3.2.RELEASE</spring.version>
		<!-- log4j日志文件管理包版本 -->
		<slf4j.version>1.7.21</slf4j.version>
		<log4j.version>1.2.17</log4j.version>
		<!-- hibernate版本号 -->
		<hibernate.version>5.1.0.Final</hibernate.version>
	</properties>

	<dependencies>

		<!-- spring mvc -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-webmvc</artifactId>
			<version>${spring.version}</version>
		</dependency>

		<!-- spring核心包 -->
		<!-- springframe start -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-core</artifactId>
			<version>${spring.version}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-web</artifactId>
			<version>${spring.version}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-oxm</artifactId>
			<version>${spring.version}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-tx</artifactId>
			<version>${spring.version}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-jdbc</artifactId>
			<version>${spring.version}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-context-support</artifactId>
			<version>${spring.version}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-orm</artifactId>
			<version>${spring.version}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-test</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<!-- springframe end -->

		<!-- aspectjweaver.jar这是Spring AOP所要用到的包 -->
		<dependency>
			<groupId>org.aspectj</groupId>
			<artifactId>aspectjweaver</artifactId>
			<version>1.8.9</version>
		</dependency>

		<!-- hibernate -->
		<dependency>
			<groupId>org.hibernate</groupId>
			<artifactId>hibernate-core</artifactId>
			<version>${hibernate.version}</version>
		</dependency>

		<!-- mysql驱动包 -->
		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<version>5.1.38</version>
		</dependency>

		<!-- junit测试包 -->
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.12</version>
			<scope>test</scope>
		</dependency>

		<!-- 阿里巴巴数据源包 -->
		<dependency>
			<groupId>com.alibaba</groupId>
			<artifactId>druid</artifactId>
			<version>1.0.25</version>
		</dependency>

		<!-- Json包 -->
		<dependency>
			<groupId>com.alibaba</groupId>
			<artifactId>fastjson</artifactId>
			<version>1.2.16</version>
		</dependency>

		<!-- -->
		<dependency>
			<groupId>com.fasterxml.jackson.core</groupId>
			<artifactId>jackson-databind</artifactId>
			<version>2.8.2</version>
		</dependency>

		<!-- 文件上传 -->
		<dependency>
			<groupId>commons-fileupload</groupId>
			<artifactId>commons-fileupload</artifactId>
			<version>1.3.2</version>
		</dependency>

		<!-- 日志文件管理包 -->
		<!-- log start -->
		<dependency>
			<groupId>log4j</groupId>
			<artifactId>log4j</artifactId>
			<version>${log4j.version}</version>
		</dependency>
		<dependency>
			<groupId>org.slf4j</groupId>
			<artifactId>slf4j-api</artifactId>
			<version>${slf4j.version}</version>
		</dependency>
		<dependency>
			<groupId>org.slf4j</groupId>
			<artifactId>slf4j-log4j12</artifactId>
			<version>${slf4j.version}</version>
		</dependency>
		<!-- log end -->




	</dependencies>
	<build>
		<finalName>ssh</finalName>
		
		<!--  -->
		<sourceDirectory>src/main/java</sourceDirectory>
		<testSourceDirectory>src/test/java</testSourceDirectory>

		<resources>
			<resource>
				<directory>src/main/resources</directory>
			</resource>
		</resources>
		<testResources>
			<testResource>
				<directory>src/test/resources</directory>
			</testResource>
		</testResources>

		<outputDirectory>src/main/webapp/WEB-INF/classes</outputDirectory>
		<testOutputDirectory>src/main/webapp/WEB-INF/classes</testOutputDirectory>
		
		<!-- 公用的插件配置项，给子项目共用的(在这里是为了防止<executions>标签报错) -->
		<pluginManagement>
			<plugins>
				<!-- maven插件：将项目依赖包拷贝到指定目录 (执行一下 Run As —— Maven build 就会执行copy)-->
				<plugin>
					<groupId>org.apache.maven.plugins</groupId>
					<artifactId>maven-dependency-plugin</artifactId>
					<version>2.8</version>
					<executions>
						<execution>
							<id>copy-dependencies</id>
							<phase>compile</phase>
							<goals>
	                        	<goal>copy-dependencies</goal>  
	                    	</goals>
	                    	<configuration>
			                	<outputDirectory>src/main/webapp/WEB-INF/lib</outputDirectory>
							</configuration>
						</execution>
					</executions>
				</plugin>
			</plugins>
		</pluginManagement>
		
		
		<!-- Maven插件 -->
		<plugins>
			<!-- 编译插件 -->
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-compiler-plugin</artifactId>
				<version>3.1</version>
				<configuration>
					<source>${jdk.version}</source> <!-- 源代码使用的开发版本 -->
					<target>${jdk.version}</target> <!-- 需要生成的目标class文件的编译版本 -->
					<!-- 一般而言，target与source是保持一致的， -->
					<!-- 但是，有时候为了让程序能在其他版本的jdk中运行(对于低版本目标jdk，源代码中需要没有使用低版本jdk中不支持的语法)， -->
					<!-- 会存在target不同于source的情况 -->
					<encoding>${project.build.sourceEncoding}</encoding>
					<fork>true</fork>
					<meminitial>512m</meminitial>
					<maxmem>2048m</maxmem>
				</configuration>
			</plugin>
			
			<!-- 设置资源文件的编码方式  -->
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-resources-plugin</artifactId>
				<version>2.4.3</version>
				<executions>  
				    <execution>  
				        <phase>compile</phase>  
				    </execution>  
				</executions>  
				<configuration>  
				    <encoding>UTF-8</encoding>
				</configuration>
			</plugin>
			
			<!--  -->
			<plugin>
				<artifactId>maven-clean-plugin</artifactId>  
    			<version>2.4.1</version>
    			<configuration>
    				<filesets>
    					<fileset>
    						<directory>src/main/webapp/WEB-INF/lib</directory>
    						<followSymlinks>false</followSymlinks>
    					</fileset>
    				</filesets>
    			</configuration>
			</plugin>
			
		</plugins> 
		
	</build>
</project>

```

## 二、项目资源及其它配置文件

先说明一下项目的目录结构吧，如下

```
项目名称
	| pom.xml
	| src
		| main
			| java
				| com
					| zsx
						| core
							| interceptors
						| web  
							| controller
							| dao
								| Impl
							| entity
							| service
								| Impl

			| resources
				| conf
					| jdbc.properties
				| applicationContext.xml
				| log4j.properties
				| springMVC-servlet.xml
				| spring-hibernate.xml

			| webapp
				| WEB-INF
					| web.xml
				| index.jsp
		| test
			| UtilTest.java
	
``` 

现在说一下 \src\main\resources 目录下的配置文件，

*  conf 目录下 jdbc.properties 是数据库连接配置
*  applicationContext.xml 是spring的主要配置文件，（自动扫描）
*  log4j.properties 记录日志
*  springMVC-servlet.xml 配置springMVC，（扫描注解、视图解析器、拦截器、上传文件配置）
*  spring-hibernate.xml   配置数据源、注解、事务等

下面放代码：

###  jdbc.properties
```
# MySql 
jdbc_driverClassName=com.mysql.jdbc.Driver
jdbc_url=jdbc:mysql://localhost:3306/mytest?createDatabaseIfNotExist=true&amp;useUnicode=true&amp;characterEncoding=utf-8&amp;zeroDateTimeBehavior=convertToNull&amp;transformedBitIsBoolean=true
jdbc_username=root
jdbc_password=root
``` 
### applicationContext.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
			http://www.springframework.org/schema/beans/spring-beans-4.3.xsd
			http://www.springframework.org/schema/context
			http://www.springframework.org/schema/context/spring-context-4.3.xsd"
			>

	<!-- 加载配置文件 -->
	<!-- 将多个配置文件读取到容器中，交给Spring管理 -->
	<bean id="propertyConfigurer"
		class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
		<property name="locations">
			<list>
				<value>classpath:conf/jdbc.properties</value>
			</list>
		</property>
	</bean>

	<!-- 自动扫描dao和service包(自动注入) -->
	<context:component-scan base-package="com.zsx.web.dao,com.zsx.web.service" />
	
</beans>			
``` 
### springMVC-servlet.xml 
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	   xmlns:p="http://www.springframework.org/schema/p"
	   xmlns:context="http://www.springframework.org/schema/context" 
	   xmlns:mvc="http://www.springframework.org/schema/mvc" 
xsi:schemaLocation="http://www.springframework.org/schema/beans  
      http://www.springframework.org/schema/beans/spring-beans-4.3.xsd  
      http://www.springframework.org/schema/context  
      http://www.springframework.org/schema/context/spring-context-4.3.xsd  
      http://www.springframework.org/schema/mvc  
      http://www.springframework.org/schema/mvc/spring-mvc-4.3.xsd">

	<!-- 注解扫描包 , 多个写法:com.zsx.web.*,org.weixin.*  (以完成bean创建和自动依赖注入的功能)-->
	<context:component-scan base-package="com.zsx.web.*" >
		<!-- springMVC配置文件中将Service注解给去掉 -->
		<context:include-filter type="annotation" expression="org.springframework.stereotype.Controller" />
		<context:exclude-filter type="annotation" expression="org.springframework.stereotype.Service" />
		<context:exclude-filter type="annotation" expression="org.springframework.stereotype.Repository" />
	</context:component-scan>
	
	<!-- <context:component-scan /> -->
	<!-- 扫描指定的包中的类上的注解，常用的注解有： -->
	<!-- @Controller 声明Action组件 -->
	<!-- @Service 声明Service组件 @Service("xxxService") -->
	<!-- @Repository 声明Dao组件 -->
	<!-- @Component 泛指组件, 当不好归类时. -->
	<!-- @RequestMapping("/menu") 请求映射 -->
	<!-- @Resource 用于注入，( j2ee提供的 ) 默认按名称装配，@Resource(name="beanName") -->
	<!-- @Autowired 用于注入，(spring提供的) 默认按类型装配 -->
	<!-- @Transactional( rollbackFor={Exception.class}) 事务管理 -->
	<!-- @ResponseBody将内容或对象作为 HTTP 响应正文返回，并调用适合HttpMessageConverter的Adapter转换对象，写入输出流 -->
	<!-- @Scope("prototype") 设定bean的作用域 -->
	

	<!-- 启用spring mvc 注解 -->
	<!-- <context:annotation-config /> -->

	<!-- 开启注解方案1 -->
	<!-- 注解方法处理 -->
	<!-- <bean class="org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerAdapter" /> -->
	<!-- 注解类映射处理 -->
	<!-- <bean class="org.springframework.web.servlet.mvc.annotation.DefaultAnnotationHandlerMapping" /> -->

	<!-- 开启注解方案2 -->
	<mvc:annotation-driven />



	<!-- 静态资源访问，方案1 -->
	<!--<mvc:resources mapping="/static/**" location="/static/" /> 
		<mvc:resources mapping="/images/**" location="/WEB-INF/images/" />
		<mvc:resources mapping="/css/**" location="/WEB-INF/css/" />
		<mvc:resources mapping="/js/**" location="/WEB-INF/js/" />-->

	<!-- 静态资源访问，方案2 (表示不对静态资源如CSS、JS、HTML等进行拦截) -->
	<mvc:default-servlet-handler />


	<!-- 视图解释类 -->
	<bean id="viewResolver"
		class="org.springframework.web.servlet.view.InternalResourceViewResolver">
		<property name="prefix" value="/"></property>
		<!--可为空,方便实现自已的依据扩展名来选择视图解释类的逻辑 -->
		<property name="suffix" value=".jsp"></property>
	</bean>
	
	<!-- Spring MVC JSON配置 -->
	<bean class="org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerAdapter">
	    <property name="messageConverters">
	    	<list>
	    		<bean
					class="org.springframework.http.converter.StringHttpMessageConverter">
					<property name="supportedMediaTypes">
						<list>
							<value>text/plain;charset=UTF-8</value>
						</list>
					</property>
				</bean>
				<bean
					class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter">
					<property name="supportedMediaTypes">
						<list>
							<value>application/json;charset=UTF-8</value>
						</list>
					</property>
				</bean>
	    	</list>
	    </property>
	</bean>
 
	<!-- 文件上传配置 -->
	<bean id="multipartResolver"
		class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
		<property name="defaultEncoding">
			<value>UTF-8</value>
		</property>
		<property name="maxUploadSize">
			<value>104857600</value> <!-- 100M  1024 * 1024 * 100 -->
		</property>
		<property name="maxInMemorySize">
			<value>4096</value>
		</property>
	</bean>
	
	<!-- 拦截器 -->
	<mvc:interceptors>
		<!-- <mvc:interceptor>
			<mvc:mapping path="/**" />
			<bean class="com.weixin.core.interceptors.EncodingInterceptor" />
		</mvc:interceptor> -->
		<mvc:interceptor>
			<mvc:mapping path="/**" />
			<bean class="com.zsx.core.interceptors.AuthInterceptor">
				<!-- 不需要权限验证的地址  -->
				<property name="excludeUrls">
					<list>
						<value>wechat</value><!-- 登录页面 -->
						<value>checkname</value><!-- 注册时检查用户名是否重复 -->
						<value>register</value><!-- 注册页面 -->
						<value>login</value><!-- 登录操作 -->
						<value>logout</value><!-- 登出操作 -->
						<value>validatecode</value><!-- 生成验证码 -->
						<value>user/getUserList</value>
					</list>
				</property>
			</bean>
		</mvc:interceptor>
	</mvc:interceptors>

</beans>  
```
### spring-hibernate.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tx="http://www.springframework.org/schema/tx"
	xmlns:aop="http://www.springframework.org/schema/aop"
	xsi:schemaLocation="
			http://www.springframework.org/schema/beans 
			http://www.springframework.org/schema/beans/spring-beans-4.3.xsd 
			http://www.springframework.org/schema/tx 
			http://www.springframework.org/schema/tx/spring-tx-4.3.xsd
			http://www.springframework.org/schema/aop 
			http://www.springframework.org/schema/aop/spring-aop-4.3.xsd
">

	<!-- 配置数据源 -->
	<bean name="dataSource" class="com.alibaba.druid.pool.DruidDataSource"
		init-method="init" destroy-method="close">
		<property name="url" value="${jdbc_url}" />
		<property name="username" value="${jdbc_username}" />
		<property name="password" value="${jdbc_password}" />

		<!-- 初始化连接大小 -->
		<property name="initialSize" value="0" />
		<!-- 连接池最大使用连接数量 -->
		<property name="maxActive" value="20" />
		<!-- 连接池最大空闲 -->
		<property name="maxIdle" value="20" />
		<!-- 连接池最小空闲 -->
		<property name="minIdle" value="0" />
		<!-- 获取连接最大等待时间 -->
		<property name="maxWait" value="60000" />

		<property name="validationQuery" value="${validationQuery}" />
		<property name="testOnBorrow" value="false" />
		<property name="testOnReturn" value="false" />
		<property name="testWhileIdle" value="true" />

		<!-- 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒 -->
		<property name="timeBetweenEvictionRunsMillis" value="60000" />
		<!-- 配置一个连接在池中最小生存的时间，单位是毫秒 -->
		<property name="minEvictableIdleTimeMillis" value="25200000" />

		<!-- 打开removeAbandoned功能 -->
		<property name="removeAbandoned" value="true" />
		<!-- 1800秒，也就是30分钟 -->
		<property name="removeAbandonedTimeout" value="1800" />
		<!-- 关闭abanded连接时输出错误日志 -->
		<property name="logAbandoned" value="true" />

		<!-- 监控数据库 -->
		<property name="filters" value="mergeStat" />
	</bean>


	<!-- 配置hibernate session工厂 -->
	<bean id="sessionFactory"
		class="org.springframework.orm.hibernate5.LocalSessionFactoryBean">
		<property name="dataSource" ref="dataSource" />
		<property name="hibernateProperties">
			<props>
				<prop key="hibernate.hbm2ddl.auto">${hibernate.hbm2ddl.auto}</prop>
				<prop key="hibernate.dialect">${hibernate.dialect}</prop>
				<prop key="hibernate.show_sql">${hibernate.show_sql}</prop>
				<prop key="hibernate.format_sql">${hibernate.format_sql}</prop>
				
				<prop key="current_session_context_class">thread</prop>
			</props>
		</property>

		<!-- 自动扫描注解方式配置的hibernate类文件 -->
		<property name="packagesToScan">
			<list>
				<value>com.zsx.web.*</value>
			</list>
		</property>
	</bean>


	<!-- 配置事务管理器 在*ServiceImpl里写@Transactional就可以启用事务管理 -->
	<bean id="transactionManager"
		class="org.springframework.orm.hibernate5.HibernateTransactionManager">
		<property name="sessionFactory" ref="sessionFactory"></property>
	</bean>

	<!-- 第一种方式: 注解方式配置事物 -->
	<!-- <tx:annotation-driven transaction-manager="transactionManager" /> -->

	<!-- 第二种方式: 拦截器方式配置事物 -->
	<tx:advice id="transactionAdvice" transaction-manager="transactionManager">
		<tx:attributes>
			<tx:method name="add*" />
			<tx:method name="save*" />
			<tx:method name="update*" />
			<tx:method name="modify*" />
			<tx:method name="edit*" />
			<tx:method name="delete*" />
			<tx:method name="remove*" />
			<tx:method name="repair" />
			<tx:method name="deleteAndRepair" />

			<tx:method name="get*" propagation="SUPPORTS" />
			<tx:method name="find*" propagation="SUPPORTS" />
			<tx:method name="load*" propagation="SUPPORTS" />
			<tx:method name="search*" propagation="SUPPORTS" />
			<tx:method name="datagrid*" propagation="SUPPORTS" />

			<tx:method name="*" propagation="SUPPORTS" />
		</tx:attributes>
	</tx:advice>


	<!-- Spring AOP config 解释一下 (* com.evan.crm.service.*.*(..)) 中几个通配符的含义： -->
	<!-- 第一个 * —— 通配 任意返回值类型 -->
	<!-- 第二个 * —— 通配 包com.evan.crm.service下的任意class -->
	<!-- 第三个 * —— 通配包com.evan.crm.service下的任意class的任意方法 -->
	<!-- 第四个 .. —— 通配 方法可以有0个或多个参数 -->
	<!-- 事务控制位置，一般在业务层service -->
	<aop:config>
		<aop:pointcut id="transactionPointcut" expression="execution(* com.zsx.web.service..*Impl.*(..))" />
			<!-- 多个 expression="(execution(* com.weixin.web.service..*Impl.*(..)))or(execution(* org.weixin.service..*Impl.*(..)))" -->
		<aop:advisor pointcut-ref="transactionPointcut" advice-ref="transactionAdvice" />
	</aop:config>



</beans>

``` 

## 三、后台核心代码 java\src

### 1. 创建实体类对象  src\main\java\com\zsx\web\entity\User.java

```
package com.zsx.web.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "ID", nullable = false, length = 36)
	private String id;//
	  
	@Column(name = "NAME")
	private String name;//
	  
	@Column(name = "PWD")
	private String pwd;//

	public User() {
	}

	public User(String id) {
		this.id = id;
	}

	public User(String id, String userName, String passWord) {
		this.id = id;
		this.name = userName;
		this.pwd = passWord;
	}
	  
	public String getId() {
		 return id;
	}
	
	public void setId(String id) {
		 this.id = id;
	}
	
	public String getName() {
		 return name;
	}
	
	public void setName(String name) {
		 this.name = name;
	}
	
	public String getPwd() {
		 return pwd;
	}
	
	public void setPwd(String pwd) {
		 this.pwd = pwd;
	}
	
	
}
```

### 2. 创建通用dao接口文件  src\main\java\com\zsx\web\dao\BaseDao.java

```
package com.zsx.web.dao;

import java.io.Serializable;
import java.math.BigInteger;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * 基础数据库操作类 其他DAO继承此类获取常用的数据库操作方法
 * 
 * @param <T>
 *            模型
 */
public interface BaseDao<T> {

	/**
	 * 保存一个对象
	 * 
	 * @param o
	 *            对象
	 * @return 对象的ID
	 */
	public Serializable save(T o);

	/**
	 * 删除一个对象
	 * 
	 * @param o
	 *            对象
	 */
	public void delete(T o);
	/**
	 * 更新一个对象
	 * 
	 * @param o
	 *            对象
	 */
	public void update(T o);
	/**
	 * 保存或更新一个对象
	 * 
	 * @param o
	 *            对象
	 */
	 public void saveOrUpdate(T o);
	/**
	 * 通过主键获得对象
	 * 
	 * @param c
	 *            类名.class
	 * @param id
	 *            主键
	 * @return 对象
	 */
	public T get(Class<T> c, Serializable id);

	/**
	 * 通过HQL语句获取一个对象
	 * 
	 * @param hql
	 *            HQL语句
	 * @return 对象
	 */
	public T get(String hql);

	/**
	 * 通过HQL语句获取一个对象
	 * 
	 * @param hql
	 *            HQL语句
	 * @param params
	 *            参数
	 * @return 对象
	 */
	public T get(String hql, Map<String, Object> params);

	/**
	 * 获得对象列表
	 * 
	 * @param hql
	 *            HQL语句
	 * @return List
	 */
	public List<T> find(String hql);

	/**
	 * 获得对象列表
	 * 
	 * @param hql
	 *            HQL语句
	 * @param params
	 *            参数
	 * @return List
	 */
	public List<T> find(String hql, Map<String, Object> params);

	/**
	 * 获得分页后的对象列表
	 * 
	 * @param hql
	 *            HQL语句
	 * @param page
	 *            要显示第几页
	 * @param rows
	 *            每页显示多少条
	 * @return List
	 */
	public List<T> find(String hql, int page, int rows);

	/**
	 * 获得分页后的对象列表
	 * 
	 * @param hql
	 *            HQL语句
	 * @param params
	 *            参数
	 * @param page
	 *            要显示第几页
	 * @param rows
	 *            每页显示多少条
	 * @return List
	 */
	public List<T> find(String hql, Map<String, Object> params, int page,
			int rows);

	/**
	 * 统计数目
	 * 
	 * @param hql
	 *            HQL语句(select count() from T)
	 * @return long
	 */
	public Long count(String hql);

	/**
	 * 统计数目
	 * 
	 * @param hql
	 *            HQL语句(select count() from T where xx = :xx)
	 * @param params
	 *            参数
	 * @return long
	 */
	public Long count(String hql, Map<String, Object> params);

	/**
	 * 执行一条HQL语句
	 * 
	 * @param hql
	 *            HQL语句
	 * @return 响应结果数目
	 */
	public int executeHql(String hql);

	/**
	 * 执行一条HQL语句
	 * 
	 * @param hql
	 *            HQL语句
	 * @param params
	 *            参数
	 * @return 响应结果数目
	 */
	public int executeHql(String hql, Map<String, Object> params);

	/**
	 * 获得结果集
	 * 
	 * @param sql
	 *            SQL语句
	 * @return 结果集
	 */
	public List<Object[]> findBySql(String sql);

	/**
	 * 获得结果集
	 * 
	 * @param sql
	 *            SQL语句
	 * @param page
	 *            要显示第几页
	 * @param rows
	 *            每页显示多少条
	 * @return 结果集
	 */
	public List<Object[]> findBySql(String sql, int page, int rows);

	/**
	 * 获得结果集
	 * 
	 * @param sql
	 *            SQL语句
	 * @param params
	 *            参数
	 * @return 结果集
	 */
	public List<Object[]> findBySql(String sql, Map<String, Object> params);

	/**
	 * 获得结果集
	 * 
	 * @param sql
	 *            SQL语句
	 * @param params
	 *            参数
	 * @param page
	 *            要显示第几页
	 * @param rows
	 *            每页显示多少条
	 * @return 结果集
	 */
	public List<Object[]> findBySql(String sql, Map<String, Object> params,
			int page, int rows);

	/**
	 * 执行SQL语句
	 * 
	 * @param sql
	 *            SQL语句
	 * @return 响应行数
	 */
	public int executeSql(String sql);

	/**
	 * 执行SQL语句
	 * 
	 * @param sql
	 *            SQL语句
	 * @param params
	 *            参数
	 * @return 响应行数
	 */
	public int executeSql(String sql, Map<String, Object> params);

	/**
	 * 统计
	 * 
	 * @param sql
	 *            SQL语句
	 * @return 数目
	 */
	public BigInteger countBySql(String sql);

	/**
	 * 统计
	 * 
	 * @param sql
	 *            SQL语句
	 * @param params
	 *            参数
	 * @return 数目
	 */
	public BigInteger countBySql(String sql, Map<String, Object> params);

	/**
	 * @param sqllist
	 *            //存储sql语句的list
	 * @throws SQLException
	 */
	public void batchSave(List<T> entitys) throws SQLException;

}

``` 

### 3. 通用dao接口的实现类文件  src\main\java\com\zsx\web\dao\Impl\BaseDaoImpl.java

```
package com.zsx.web.dao.Impl;

import java.io.Serializable;
import java.math.BigInteger;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import com.zsx.web.dao.BaseDao;

@Repository
public class BaseDaoImpl<T> implements BaseDao<T> {
	
//	@Autowired
	@Resource
	private SessionFactory sessionFactory;

	/**
	 * 获得当前事物的session
	 * @return org.hibernate.Session
	 */
	protected Session getCurrentSession() {
//		return sessionFactory.getCurrentSession(); // hibernate 3.x版本后摒弃该方法
		//从会话工厂获取一个session
		return sessionFactory.openSession();
	}

	public Serializable save(T o) {
		if (o != null) {
			Serializable save = this.getCurrentSession().save(o);
			return save;
		}
		return null;
	}

	public T get(Class<T> c, Serializable id) {
		return (T) this.getCurrentSession().get(c, id);
	}

	public T get(String hql) {
		Query q = this.getCurrentSession().createQuery(hql);
		List<T> l = q.list();
		if (l != null && l.size() > 0) {
			return l.get(0);
		}
		return null;
	}

	public T get(String hql, Map<String, Object> params) {
		Query q = this.getCurrentSession().createQuery(hql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		List<T> l = q.list();
		if (l != null && l.size() > 0) {
			return l.get(0);
		}
		return null;
	}

	 public void delete(T o) {
		 if (o != null) {
			 this.getCurrentSession().delete(o);
		 }
	 }
	
	 public void update(T o) {
		 if (o != null) {
			 this.getCurrentSession().update(o);
		 }
	 }

	public void saveOrUpdate(T o) {
		if (o != null) {
			this.getCurrentSession().saveOrUpdate(o);
		}
	}

	public List<T> find(String hql) {
		Query q = this.getCurrentSession().createQuery(hql);
		return q.list();
	}

	public List<T> find(String hql, Map<String, Object> params) {
		Query q = this.getCurrentSession().createQuery(hql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.list();
	}

	public List<T> find(String hql, Map<String, Object> params, int page,
			int rows) {
		Query q = this.getCurrentSession().createQuery(hql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.setFirstResult((page - 1) * rows).setMaxResults(rows).list();
	}

	public List<T> find(String hql, int page, int rows) {
		Query q = this.getCurrentSession().createQuery(hql);
		return q.setFirstResult((page - 1) * rows).setMaxResults(rows).list();
	}

	public Long count(String hql) {
		Query q = this.getCurrentSession().createQuery(hql);
		return (Long) q.uniqueResult();
	}

	public Long count(String hql, Map<String, Object> params) {
		Query q = this.getCurrentSession().createQuery(hql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return (Long) q.uniqueResult();
	}

	public int executeHql(String hql) {
		Query q = this.getCurrentSession().createQuery(hql);
		return q.executeUpdate();
	}

	public int executeHql(String hql, Map<String, Object> params) {
		Query q = this.getCurrentSession().createQuery(hql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.executeUpdate();
	}

	public List<Object[]> findBySql(String sql) {
		SQLQuery q  = this.getCurrentSession().createSQLQuery(sql);
		return q.list();
	}

	public List<Object[]> findBySql(String sql, int page, int rows) {
		SQLQuery q = this.getCurrentSession().createSQLQuery(sql);
		return q.setFirstResult((page - 1) * rows).setMaxResults(rows).list();
	}

	public List<Object[]> findBySql(String sql, Map<String, Object> params) {
		SQLQuery q = this.getCurrentSession().createSQLQuery(sql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.list();
	}

	public List<Object[]> findBySql(String sql, Map<String, Object> params,
			int page, int rows) {
		SQLQuery q = this.getCurrentSession().createSQLQuery(sql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.setFirstResult((page - 1) * rows).setMaxResults(rows).list();
	}

	public int executeSql(String sql) {
		SQLQuery q = this.getCurrentSession().createSQLQuery(sql);
		return q.executeUpdate();
	}

	public int executeSql(String sql, Map<String, Object> params) {
		SQLQuery q = this.getCurrentSession().createSQLQuery(sql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.executeUpdate();
	}

	public BigInteger countBySql(String sql) {
		SQLQuery q = this.getCurrentSession().createSQLQuery(sql);
		return (BigInteger) q.uniqueResult();
	}

	public BigInteger countBySql(String sql, Map<String, Object> params) {
		SQLQuery q = this.getCurrentSession().createSQLQuery(sql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return (BigInteger) q.uniqueResult();
	}

	/**
	 * 批量保存数据
	 * 
	 * @param <T>
	 * @param entitys 要持久化的临时实体对象集合
	 */
	public void batchSave(List<T> entitys) throws SQLException {
		for (int i = 0; i < entitys.size(); i++) {
			getCurrentSession().save(entitys.get(i));
			if (i % 20 == 0) {
				// 20个对象后才清理缓存，写入数据库
				getCurrentSession().flush();
				getCurrentSession().clear();
			}
		}
		// 最后清理一下----防止大于20小于40的不保存
		getCurrentSession().flush();
		getCurrentSession().clear();
	}

}

```

### 4. 实体类User对应的dao层 接口 及 其实现类
+ src\main\java\com\zsx\web\dao\UserDao.java

```
package com.zsx.web.dao;

import com.zsx.web.entity.Tuser;

public interface UserDao extends BaseDao<Tuser>{
}

```

+ src\main\java\com\zsx\web\dao\Impl\UserDaoImpl.java

**注意这里因为继承了通用basedao，所以不需要写具体的持久层方法，当然如果需要特殊的拓展，可以在这里写，写法类似BaseDao中的写法**

```
package com.zsx.web.dao.Impl;

import org.springframework.stereotype.Repository;

import com.zsx.web.dao.UserDao;
import com.zsx.web.entity.Tuser;

@Repository
public class UserDaoImpl extends BaseDaoImpl<Tuser> implements UserDao{
	
}

```


### 5. 逻辑层service 定义接口 及 其实现类  
+ src\main\java\com\zsx\web\service\UserService.java

```
package com.zsx.web.service;

import java.util.List;

import com.zsx.web.entity.User;
/**
 * 用户管理service接口
 * @author zsx
 *
 */
public interface UserService {
	/**
	 * 获取所有的用户信息
	 */
	List<Tuser> getAllUser();
	
	void addUser(Tuser user);
}

``` 		
+ src\main\java\com\zsx\web\service\Impl\UserServiceImpl.java

```
package com.zsx.web.service.Impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zsx.web.dao.UserDao;
import com.zsx.web.entity.User;
import com.zsx.web.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;
	
	@Override
	public List<User> getAllUser() {
		List<User> tuList = userDao.find("from User t");
		return tuList;
	}

	@Override
	public void addUser(User user) {
		userDao.save(user);
	}
}

```

### 6. controller 控制层（action层）  src\main\java\com\zsx\web\controller\UserController.java

```
package com.zsx.web.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSON;
import com.zsx.web.entity.User;
import com.zsx.web.service.UserService;
/**
 * 用户
 * @author zsx
 *
 */
@Controller
@RequestMapping("user")
public class UserController {

	@Autowired
	private UserService userService;
	
	/**
	 * 获取用户列表
	 */
	@RequestMapping("/getUserList")
	public void getJson(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		List<User> list = userService.getAllUser();
		response.setContentType("application/json;charset=utf-8");
		PrintWriter out = response.getWriter();
		out.println(JSON.toJSONString(list));
		out.flush();
		out.close();
	}
}

``` 

### 6. 拦截器代码(可忽略)

> 我在`springMVC-servlet.xml`中配置了拦截器，所以要添加下面的一个方法，如果不想添加，直接去`springMVC-servlet.xml` 中把拦截器的标签注释`<mvc:interceptors>`掉即可。

- src\main\java\com\zsx\core\interceptors\AuthInterceptor.java

```
package com.zsx.core.interceptors;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class AuthInterceptor implements HandlerInterceptor {

	private List<String> excludeUrls;// 不需要拦截的资源
	public List<String> getExcludeUrls() {
		return excludeUrls;
	}
	public void setExcludeUrls(List<String> excludeUrls) {
		this.excludeUrls = excludeUrls;
	}

	/**
	 * 这个方法的主要作用是用于清理资源的，当然这个方法也只能在当前这个Interceptor的preHandle方法的返回值为true时才会执行。
	 */
	@Override
	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		

	}

	/**
	 * 在Controller的方法调用之后执行
	 */
	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
			throws Exception {
		

	}

	/** 
     * preHandle方法是进行处理器拦截用的，顾名思义，该方法将在Controller处理之前进行调用，
     * SpringMVC中的Interceptor拦截器是链式的，可以同时存在多个Interceptor，
     * 然后SpringMVC会根据声明的前后顺序一个接一个的执行，而且所有的Interceptor中的preHandle方法都会在Controller方法调用之前调用。
     * SpringMVC的这种Interceptor链式结构也是可以进行中断的，这种中断方式是令preHandle的返 
     * 回值为false，当preHandle的返回值为false的时候整个请求就结束了。 
     */
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object arg2) throws Exception {
		HttpSession session = request.getSession();
		String requestURI = request.getRequestURI();
		String contextPath = request.getContextPath();
		String url = requestURI.substring(contextPath.length() + 1);
		
		// 测试用
		if (true) {
			return true;
		}
		
		// 如果要访问的资源是不需要验证的
		if (url.indexOf("wechatController") > -1 || excludeUrls.contains(url)) {
			return true;
		}
		
		// 获取用户 信息 验证 然后判断  TODO

		return false;
	}

}

``` 

## 四、单元测试

*src\test\java\ssm\UtilTest.java*

```
package ssm;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.alibaba.fastjson.JSON;
import com.zsx.web.dao.UserDao;
import com.zsx.web.entity.User;
import com.zsx.web.service.UserService;

/**
 * 单元测试
 * @author developer
 */
// 告诉spring怎样执行
@RunWith(SpringJUnit4ClassRunner.class)
//  标明是web应用测试
@WebAppConfiguration(value = "src/main/webapp") //可以不填，默认此目录
// 配置文件地址
@ContextConfiguration(locations = { "file:src/main/resources/applicationContext.xml", "file:src/main/resources/spring-hibernate.xml", "file:src/main/resources/springMVC-servlet.xml" })

public class UtilTest {
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private UserService userService;
	
	@Before
	public void before(){
		System.out.println("准备测试！！！");
	}
	
	@After
	public void After(){
		System.out.println("测试结束！！！");
	}
	
	@Test
	public void get() {
		User tuser = userDao.get("from User");
		System.out.println(JSON.toJSONString(tuser));
	}
	
	@Test
	public void add(){
		User user = new User();
		user.setId("99");
		user.setName("wodemingzi");
		user.setPwd("!@#$%^&");
		userService.addUser(user);
	}
		
}

```

当把上面的单元测试代码写完后，就可以运行单元测试了，选中方法名`add` 右键 Debug As —— JUnit Test 即可。


------
 
最后，忘了配置web.xml了，代码如下： **src\main\webapp\WEB-INF\web.xml**

```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns="http://java.sun.com/xml/ns/javaee" xmlns:web="http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
	xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
	id="WebApp_ID" version="2.5">

	<display-name>Archetype Created Web Application</display-name>

	<!-- 读取spring配置文件 -->
	<context-param>
		<param-name>contextConfigLocation</param-name>
		<param-value>
			classpath:applicationContext.xml,classpath:spring-hibernate.xml
		</param-value>
	</context-param>

	<listener>
		<description>spring监听器</description>
		<listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
	</listener>

	<!-- 防止spring内存溢出监听器 -->
	<listener>
		<description>Introspector缓存清除监听器</description>
		<listener-class>org.springframework.web.util.IntrospectorCleanupListener</listener-class>
	</listener>

	<!-- springMVC核心配置 -->
	<!-- 配置spring mvc的相关内容，此处的servlet-name任意，但必须有<your servlet-name>-servlet.xml与之对应 -->
	<servlet>
		<servlet-name>springMVC</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<init-param>
			<param-name>contextConfigLocation</param-name>
			<param-value>classpath:springMVC-servlet.xml</param-value>
		</init-param>
		<load-on-startup>1</load-on-startup>
	</servlet>
	<servlet-mapping>
		<servlet-name>springMVC</servlet-name>
		<url-pattern>/</url-pattern>
	</servlet-mapping>


	<!-- 配置过滤器，同时把所有的请求都转为utf-8编码 -->
	<filter>
		<filter-name>characterEncodingFilter</filter-name>
		<filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
		<init-param>
			<param-name>encoding</param-name>
			<param-value>UTF-8</param-value>
		</init-param>
		<init-param>
			<param-name>forceEncoding</param-name>
			<param-value>true</param-value>
		</init-param>
	</filter>
	<filter-mapping>
		<filter-name>characterEncodingFilter</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>

	<!-- openSessionInView配置 -->
	<filter>
		<filter-name>openSessionInViewFilter</filter-name>
		<filter-class>org.springframework.orm.hibernate5.support.OpenSessionInViewFilter</filter-class>
		<init-param>
			<param-name>singleSession</param-name>
			<param-value>true</param-value>
		</init-param>
	</filter>
	<filter-mapping>
		<filter-name>openSessionInViewFilter</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>

	<!-- 配置session超时时间，单位分钟 -->
	<session-config>
		<session-timeout>30</session-timeout>
	</session-config>

	<welcome-file-list>
		<welcome-file>index.jsp</welcome-file>
	</welcome-file-list>

</web-app>


``` 

至此，整个项目算是搭建完毕了，将项目发布到tomcat或jetty中，在浏览器中输入：

`http://localhost:[端口号]/[你的项目名]/user/getUserList`

就可以看到效果了


## 五、注意事项

1. 如果你的文件目录名称跟我的不一样，请注意修改`applicationContext.xml` 、`spring-hibernate.xml` 、`springMVC-servlet.xml` 配置文件里的各种路径属性
2. 注意 `jdbc.properties` 里数据库连接地址配置， ip、端口号、库名等
3. 本篇代码仅在 spring4.3.2 和 Hibernate5.1.0.Final 版本下运行测试，其它版本请自行查看版本变动
