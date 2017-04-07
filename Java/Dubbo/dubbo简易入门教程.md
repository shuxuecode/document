## 1、安装zookeeper

去http://archive.apache.org/dist/zookeeper/
下载最新版本

解压，进入conf文件夹，复制zoo_sample.cfg为zoo.cfg，修改其中的配置

	dataDir=
	client




## 2、创建一个公共的接口服务

	mvn archetype:generate -DgroupId=com.zsx -DartifactId=dubbo-api -DarchetypeArtifactId=maven-archetype-webapp -DarchetypeCatalog=local


pom.xml

	<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>com.zsx</groupId>
	<artifactId>dubbo-api</artifactId>
	<packaging>jar</packaging>
	<version>1.0.1</version>
	<name>dubbo-api Maven Webapp</name>
	<url>http://maven.apache.org</url>
	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<jdk.version>1.7</jdk.version>
	</properties>

	<dependencies>

	</dependencies>
	<build>
		<finalName>${project.artifactId}-${project.version}</finalName>

	</build>
	</project>

**注意** packaging 为jar


	package com.zsx.service;

	public interface TestService {

		String test(String name);

	}


## 三、创建生成者

dubbo-productor

	<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>com.zsx</groupId>
	<artifactId>dubbo-productor</artifactId>
	<packaging>war</packaging>
	<version>1.0-SNAPSHOT</version>
	<name>dubbo-productor Maven Webapp</name>
	<url>http://maven.apache.org</url>

	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<jdk.version>1.7</jdk.version>
		<!-- spring版本号 -->
		<spring.version>4.3.2.RELEASE</spring.version>

		<jackson.version>2.8.5</jackson.version>

	</properties>

	<dependencies>

		<dependency>
			<groupId>com.zsx</groupId>
			<artifactId>dubbo-api</artifactId>
			<version>1.0.1</version>
			<scope>provided</scope>
		</dependency>

		<!-- spring mvc -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-webmvc</artifactId>
			<version>${spring.version}</version>
		</dependency>

		<!-- spring -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-core</artifactId>
			<version>${spring.version}</version>
		</dependency>

		<!-- -->
		<dependency>
			<groupId>com.fasterxml.jackson.core</groupId>
			<artifactId>jackson-databind</artifactId>
			<version>${jackson.version}</version>
		</dependency>

		<dependency>
			<groupId>com.alibaba</groupId>
			<artifactId>dubbo</artifactId>
			<version>2.5.3</version>
			<exclusions>
				<exclusion>
					<groupId>org.springframework</groupId>
					<artifactId>spring</artifactId>
				</exclusion>
			</exclusions>
		</dependency>

		<dependency>
			<groupId>com.github.sgroschupf</groupId>
			<artifactId>zkclient</artifactId>
			<version>0.1</version>
		</dependency>



		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.12</version>
			<scope>test</scope>
		</dependency>
	</dependencies>
	<build>
		<finalName>dubbo-productor</finalName>
	</build>
</project>

---

web.xml

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
			classpath:applicationContext.xml
			<!-- 第二种写法： 默认的spring配置文件是在WEB-INF下的applicationContext.xml -->
			<!-- <param-value>/WEB-INF/applicationContext.xml</param-value> -->
		</param-value>
	</context-param>

	<listener>
		<description>spring监听器</description>
		<listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
	</listener>

	<!-- springMVC核心配置 -->
	<!-- 配置spring mvc的相关内容，此处的servlet-name任意，但必须有<your servlet-name>-servlet.xml与之对应 -->
	<servlet>
		<servlet-name>springMVC</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<init-param>
			<param-name>contextConfigLocation</param-name>
			<param-value>classpath:springMVC-servlet.xml</param-value>
			<!-- <param-value>/WEB-INF/spring/spring-servlet.xml</param-value> -->
		</init-param>
		<!-- 启动顺序，让这个Servlet随Servlet容器一起启动。 -->
		<load-on-startup>1</load-on-startup>
	</servlet>
	<servlet-mapping>
		<servlet-name>springMVC</servlet-name>
		<url-pattern>/</url-pattern>
	</servlet-mapping>

	<servlet>
		<servlet-name>dispatcher</servlet-name>
		<servlet-class>com.alibaba.dubbo.remoting.http.servlet.DispatcherServlet</servlet-class>
		<load-on-startup>2</load-on-startup>
	</servlet>
	<servlet-mapping>
		<servlet-name>dispatcher</servlet-name>
		<url-pattern>/services/*</url-pattern>
	</servlet-mapping>

	<welcome-file-list>
		<welcome-file>index.jsp</welcome-file>
	</welcome-file-list>
</web-app>


---


applicationContext.xml

	<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
			http://www.springframework.org/schema/beans/spring-beans-4.3.xsd
			http://www.springframework.org/schema/context
			http://www.springframework.org/schema/context/spring-context-4.3.xsd"
			>

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
	<context:component-scan base-package="com.zsx.*" />


	<!-- 引入同文件夹下的redis属性配置文件 -->
    <import resource="applicationContext-dubbo.xml"/>

</beans>			

---
springMVC-servlet.xml

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
	<context:component-scan base-package="com.zsx.*" >
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
	<!-- <bean id="multipartResolver"
		class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
		<property name="defaultEncoding">
			<value>UTF-8</value>
		</property>
		<property name="maxUploadSize">
			<value>104857600</value> 100M  1024 * 1024 * 100
		</property>
		<property name="maxInMemorySize">
			<value>4096</value>
		</property>
	</bean> -->


</beans>  


---

applicationContext-dubbo.xml

	<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"
	xsi:schemaLocation="http://www.springframework.org/schema/beans  
       http://www.springframework.org/schema/beans/spring-beans.xsd  
       http://code.alibabatech.com/schema/dubbo  
       http://code.alibabatech.com/schema/dubbo/dubbo.xsd  
       ">

	<!-- 提供方应用信息，用于计算依赖关系 -->
	<dubbo:application name="3GOLDENRESTService" />

	<!-- 使用multicast广播注册中心暴露服务地址 <dubbo:registry address="multicast://224.5.6.7:1234"
		/> -->

	<!-- 使用zookeeper注册中心暴露服务地址 172.16.2.169-->
	<dubbo:registry id="defaultRegistry" address="zookeeper://127.0.0.1:2181"
		timeout="10000"/>

	<!-- 多个注册中心配置 -->
	<!-- <dubbo:registry id="crawlerQueryRegistry" address="zookeeper://172.16.2.21:12181"
		timeout="10000" default="false"/> -->		



	<!-- 用dubbo协议在20880端口暴露服务 <dubbo:protocol name="dubbo" port="20880" /> -->

	<!-- 为了使用HTTPS，暂时使用server="servlet" accepts="500" keepalive="false" extension="com.tg.web.filter.ContentTypeFilter"
		暂时禁用ContentTypeFilter com.alibaba.dubbo.rpc.protocol.rest.support.LoggingFilter, -->
		<!-- contextpath="services" -->
<!--
	<dubbo:protocol name="rest" port="8080" contextpath="services"
		server="servlet" />
-->
	<dubbo:protocol name="dubbo" port="8780" threads="400"/>

	<!-- todo 暂时去掉 -->
	<!-- <dubbo:provider filter="typeconvert,securitytoken" /> -->

	<!-- 声明需要暴露的服务接口 -->

	<dubbo:service interface="com.zsx.service.TestService" ref="testService" />

	<!-- <dubbo:reference interface="com.tg.dc.controller.IsSave2DBService" id="isSave2DBService" timeout="300000" />
	 -->


	<!-- 爬虫服务 调用其它注册中心的服务-->
	<!-- <dubbo:reference registry="crawlerQueryRegistry" interface="cn.golden.grab.single.provider.api.ICrawlerQueryService" id="crawlerQueryService" timeout="300000" />
	 -->

</beans>  


---

\TestServiceImpl.java
src\main\java\com\zsx\serviceImpl\TestServiceImpl.java

	package com.zsx.serviceImpl;


	import org.springframework.stereotype.Service;

	import com.zsx.service.TestService;

	@Service("testService")
	public class TestServiceImpl implements TestService {

		public String test(String name) {
			return "!@# " + name;
		}

	}






















## 四、创建消费者

dubbo-customer


pom.xml

	<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>com.zsx</groupId>
	<artifactId>dubbo-customer</artifactId>
	<packaging>war</packaging>
	<version>1.0-SNAPSHOT</version>
	<name>dubbo-customer Maven Webapp</name>
	<url>http://maven.apache.org</url>
	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<jdk.version>1.7</jdk.version>
		<!-- spring版本号 -->
		<spring.version>4.3.2.RELEASE</spring.version>

		<jackson.version>2.8.5</jackson.version>

	</properties>

	<dependencies>

		<dependency>
			<groupId>com.zsx</groupId>
			<artifactId>dubbo-api</artifactId>
			<version>1.0.1</version>
			<scope>provided</scope>
		</dependency>

		<!-- spring mvc -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-webmvc</artifactId>
			<version>${spring.version}</version>
		</dependency>

		<!-- spring -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-core</artifactId>
			<version>${spring.version}</version>
		</dependency>

		<!-- -->
		<dependency>
			<groupId>com.fasterxml.jackson.core</groupId>
			<artifactId>jackson-databind</artifactId>
			<version>${jackson.version}</version>
		</dependency>

		<dependency>
			<groupId>com.alibaba</groupId>
			<artifactId>dubbo</artifactId>
			<version>2.5.3</version>
			<exclusions>
				<exclusion>
					<groupId>org.springframework</groupId>
					<artifactId>spring</artifactId>
				</exclusion>
			</exclusions>
		</dependency>

		<dependency>
			<groupId>com.github.sgroschupf</groupId>
			<artifactId>zkclient</artifactId>
			<version>0.1</version>
		</dependency>



		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.12</version>
			<scope>test</scope>
		</dependency>
	</dependencies>
	<build>
		<finalName>dubbo-customer</finalName>
	</build>
</project>


---

web.xml

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
			classpath:applicationContext.xml
			<!-- 第二种写法： 默认的spring配置文件是在WEB-INF下的applicationContext.xml -->
			<!-- <param-value>/WEB-INF/applicationContext.xml</param-value> -->
		</param-value>
	</context-param>

	<listener>
		<description>spring监听器</description>
		<listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
	</listener>

	<!-- springMVC核心配置 -->
	<!-- 配置spring mvc的相关内容，此处的servlet-name任意，但必须有<your servlet-name>-servlet.xml与之对应 -->
	<servlet>
		<servlet-name>springMVC</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<init-param>
			<param-name>contextConfigLocation</param-name>
			<param-value>classpath:springMVC-servlet.xml</param-value>
			<!-- <param-value>/WEB-INF/spring/spring-servlet.xml</param-value> -->
		</init-param>
		<!-- 启动顺序，让这个Servlet随Servlet容器一起启动。 -->
		<load-on-startup>1</load-on-startup>
	</servlet>
	<servlet-mapping>
		<servlet-name>springMVC</servlet-name>
		<url-pattern>/</url-pattern>
	</servlet-mapping>

	<welcome-file-list>
		<welcome-file>index.jsp</welcome-file>
	</welcome-file-list>
</web-app>

---

applicationContext.xml

	<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
			http://www.springframework.org/schema/beans/spring-beans-4.3.xsd
			http://www.springframework.org/schema/context
			http://www.springframework.org/schema/context/spring-context-4.3.xsd"
			>

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
	<context:component-scan base-package="com.zsx.*" />


	<!-- 引入同文件夹下的redis属性配置文件 -->
    <import resource="applicationContext-dubboConsumer.xml"/>

</beans>			

---
springMVC-servlet.xml

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
	<context:component-scan base-package="com.zsx.*" >
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
	<!-- <bean id="multipartResolver"
		class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
		<property name="defaultEncoding">
			<value>UTF-8</value>
		</property>
		<property name="maxUploadSize">
			<value>104857600</value> 100M  1024 * 1024 * 100
		</property>
		<property name="maxInMemorySize">
			<value>4096</value>
		</property>
	</bean> -->


</beans>  

---

applicationContext-dubboConsumer.xml

	<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"
	xsi:schemaLocation="http://www.springframework.org/schema/beans  
       http://www.springframework.org/schema/beans/spring-beans.xsd  
       http://code.alibabatech.com/schema/dubbo  
       http://code.alibabatech.com/schema/dubbo/dubbo.xsd  
       ">

	<!-- 消费方应用名，用于计算依赖关系，不是匹配条件，不要与提供方一样 -->
	<dubbo:application name="3GOLDENRESTService" />

	<!-- 使用zookeeper注册中心暴露服务地址 -->
	<!-- <dubbo:registry address="multicast://224.5.6.7:1234" /> -->
	<dubbo:registry address="zookeeper://127.0.0.1:2181" timeout="10000"/>

	<!-- 生成远程服务代理，可以像使用本地bean一样使用demoService -->
	<dubbo:reference interface="com.zsx.service.TestService" id="testService" timeout="300000" />

</beans>  

---
\src\main\java\com\zsx\controller\TestController.java


	package com.zsx.controller;

	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Controller;
	import org.springframework.web.bind.annotation.GetMapping;
	import org.springframework.web.bind.annotation.ResponseBody;

	import com.zsx.service.TestService;

	@Controller
	public class TestController {

		@Autowired
		private TestService testService;

		@GetMapping("/demo")
		@ResponseBody
		public String asdf(String name){
			return testService.test(name);
		}

	}
