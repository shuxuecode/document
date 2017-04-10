package com.golden.config.shiro;

import java.util.LinkedHashMap;
import java.util.Map;

import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.cache.ehcache.EhCacheManager;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;

@Configuration
public class ShiroConfiguration {

	/**
     * ShiroFilterFactoryBean 处理拦截资源文件问题。
     * 注意：单独一个ShiroFilterFactoryBean配置是或报错的，以为在
     * 初始化ShiroFilterFactoryBean的时候需要注入：SecurityManager
     *
        Filter Chain定义说明
       1、一个URL可以配置多个Filter，使用逗号分隔
       2、当设置多个过滤器时，全部验证通过，才视为通过
       3、部分过滤器可指定参数，如perms，roles
     *
     */
    @Bean
	public ShiroFilterFactoryBean shirFilter(SecurityManager securityManager) {
		ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();

		shiroFilterFactoryBean.setSecurityManager(securityManager);

		// 拦截器.
		Map<String, String> filterChainDefinitionMap = new LinkedHashMap<String, String>();

		// 配置退出过滤器,其中的具体的退出代码Shiro已经替我们实现了
		filterChainDefinitionMap.put("/logout", "logout");

		// <!-- 过滤链定义，从上向下顺序执行，一般将 /**放在最为下边 -->:这是一个坑呢，一不小心代码就不好使了;
		// <!-- authc:所有url都必须认证通过才可以访问; anon:所有url都都可以匿名访问-->
		filterChainDefinitionMap.put("/**", "authc");

		// 如果不设置默认会自动寻找Web工程根目录下的"/login.jsp"页面
		shiroFilterFactoryBean.setLoginUrl("/login");
		// 登录成功后要跳转的链接
		shiroFilterFactoryBean.setSuccessUrl("/index");
		// 未授权界面;
		shiroFilterFactoryBean.setUnauthorizedUrl("/403");

		shiroFilterFactoryBean.setFilterChainDefinitionMap(filterChainDefinitionMap);
		
		return shiroFilterFactoryBean;
	}

	
	
	
	
	@Bean(name = "hashedCredentialsMatcher")
	public HashedCredentialsMatcher hashedCredentialsMatcher() {
		HashedCredentialsMatcher credentialsMatcher = new HashedCredentialsMatcher();
		credentialsMatcher.setHashAlgorithmName("MD5");
		credentialsMatcher.setHashIterations(2);
		credentialsMatcher.setStoredCredentialsHexEncoded(true);
		return credentialsMatcher;
	}
	
	/**
     * 身份认证realm;
     * (这个需要自己写，账号密码校验；权限等)
     * @return
     */
	@Bean(name = "shiroRealm")
	@DependsOn("lifecycleBeanPostProcessor")
    public ShiroRealm shiroRealm() {
		ShiroRealm realm = new ShiroRealm(); 
		realm.setCredentialsMatcher(hashedCredentialsMatcher());
        return realm;
    }
	
	@Bean(name = "ehCacheManager")
	@DependsOn("lifecycleBeanPostProcessor")
	public EhCacheManager ehCacheManager(){
		EhCacheManager ehCacheManager = new EhCacheManager();
		return ehCacheManager;
	}
	
	
	
	
	
	
	
	@Bean
    public SecurityManager securityManager(){
       DefaultWebSecurityManager securityManager =  new DefaultWebSecurityManager();
       return securityManager;
    }
	
	
	
	
	
}


/**
 * 
 * 
 * Shiro内置的FilterChain

Filter Name
Class
anon
org.apache.shiro.web.filter.authc.AnonymousFilter
authc
org.apache.shiro.web.filter.authc.FormAuthenticationFilter
authcBasic
org.apache.shiro.web.filter.authc.BasicHttpAuthenticationFilter
perms
org.apache.shiro.web.filter.authz.PermissionsAuthorizationFilter
port
org.apache.shiro.web.filter.authz.PortFilter
rest
org.apache.shiro.web.filter.authz.HttpMethodPermissionFilter
roles
org.apache.shiro.web.filter.authz.RolesAuthorizationFilter
ssl
org.apache.shiro.web.filter.authz.SslFilter
user
org.apache.shiro.web.filter.authc.UserFilter
anon:所有url都都可以匿名访问;

authc: 需要认证才能进行访问;

user:配置记住我或认证通过可以访问；
 * 
 * 
 * 
 */
