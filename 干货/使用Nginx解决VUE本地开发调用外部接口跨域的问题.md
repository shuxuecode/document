前端开发需要调用后台接口时经常遇到跨域的问题，一般是设置Chrome浏览器禁用安全模式，
在启动chrome命令后面加 `--disable-web-security`，最新的版本可能还需要加一个本地的存放chrome配置的文件夹，如下，
`--user-data-dir=C:\MyChromeDevUserData`

这种方式很不错，唯一的缺点就是有时候如果不是这种方式打开的Chrome，页面要进行跨域调试时需要关闭浏览器再用上边那种方式打开才行，这时如果已经打开了一堆网页可能就比较麻烦了。

--- 

现在介绍使用Nginx的方向代理机制来解决浏览器跨域的问题

首先假设前端VUE的端口是8080， 要调用的后台接口是：http://192.168.1.111:9090/mydemo/api/getList

因为浏览器的同源策略，所以这样必然产生了跨域。

由于VUE已经占用了前端的端口8080了，所以我们用Nginx只能再设置一个新的端口，这里暂定：8888

在nginx.conf文件 http{} 块里，添加下面的代码：

```
    server {
        listen  8888;
        server_name  localhost;

        location ^~/mydemo/ {
            rewrite ^/(.*)$ /$1 break;
            proxy_pass http://192.168.1.111:9090/mydemo/;
        }

        location / {
            proxy_pass http://127.0.0.1:8080;
        }
    }
```

###   `location ^~/mydemo/ ` 一定要放在 `location /` 前面，这样所有访问后台的请求才会走这块的代理。 一般后台服务都会带着项目名，例如`mydemo`，或者加上固定的url路径前缀，主要是为了跟前端静态资源区分开来。

重启Nginx，访问 http://localhost:8888 即可。
这样就完全避免了跨域的问题，而且不限于Chrome了，使用IE、Firefox同样没有问题。



# 下面提供一种新的解决方式

## 什么是跨域
跨域，是指浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器对JavaScript实施的安全限制。

## 那么什么是同源策略

同源策略/SOP（Same origin policy）是一种约定，由Netscape公司1995年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSFR等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。

下面列出了一些常见跨域场景

URL                                      说明                    是否允许通信
http://www.google.com/a.js
http://www.google.com/b.js         同一域名，不同文件或路径           允许
http://www.google.com/lab/c.js

http://www.google.com:8000/a.js
http://www.google.com/b.js         同一域名，不同端口                不允许
 
http://www.google.com/a.js
https://www.google.com/b.js        同一域名，不同协议                不允许
 
http://www.google.com/a.js
http://192.168.1.111/b.js           域名和域名对应相同ip              不允许
 
http://www.google.com/a.js
http://x.google.com/b.js           主域相同，子域不同                不允许
http://google.com/c.js
 
http://www.domain1.com/a.js
http://www.domain2.com/b.js        不同域名                         不允许


针对跨域，目前有很多解决方案

1、 通过jsonp跨域
2、 document.domain + iframe跨域
3、 location.hash + iframe
4、 window.name + iframe跨域
5、 postMessage跨域
6、 跨域资源共享（CORS）
7、 nginx代理跨域
8、 nodejs中间件代理跨域
9、 WebSocket协议跨域


下面我们就介绍一种目前主流的跨域解决方案——跨域资源共享（CORS）

## 什么是CORS

CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。 它允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。
CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。IE8+：IE8/9需要使用XDomainRequest对象来支持CORS。
整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。 因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。





## 后端配置
只需要配置一个过滤器即可，如下：

```
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.annotation.Order;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(urlPatterns = "/*", filterName = "corsFilter")
@Order(1)
public class CorsFilter implements Filter {

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) resp;
        HttpServletRequest request = (HttpServletRequest) req;
        // 解决跨域问题
        if (StringUtils.isNotEmpty(request.getHeader("Origin"))) {
            response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
            response.setHeader("Access-Control-Allow-Credentials", "true");
        } else {
            response.setHeader("Access-Control-Allow-Origin", "*");
        }
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "36000");
        response.setHeader("Access-Control-Allow-Headers", "accept,Access-Control-Request-Method,Access-Control-Request-Headers,Origin,token,x-requested-with, authorization, Content-Type, Authorization, credential, X-XSRF-TOKEN");
        response.setHeader("Access-Control-Expose-Headers", "Content-Type, Authorization, credential, Content-Disposition");
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            chain.doFilter(req, resp);
        }
    }

}


```

## 前端配置

前端配置只需要把withCredentials设置为true即可。

1.原生ajax

```
xhr.withCredentials = true;
```

2.vue框架

a.) axios设置：
```
// 前端设置是否带cookie
axios.defaults.withCredentials = true
```
b.) vue-resource设置：
```
Vue.http.options.credentials = true
```

这里假设后端服务地址为： 192.168.1.111:8080

我们需要配置一下hosts，（域名随便写）
```
192.168.1.111 server.google.com
```
这样访问 http://server.google.com:8080 也可能访问到你的后端服务了。

那么前端调用后端接口需要都写成 http://server.google.com:8080/+接口 这样的方式

访问前端也要用这种域名加端口的方式，比如本地启动了前端项目，端口是9090，那么也需要配置一下hosts，
```
127.0.0.1 front.google.com
```
就可以直接用 http://front.google.com:9090 访问前端页面了


也可以用下面这种配置方式直接设定vue启动后访问的url地址。

```
module.exports = {
  dev: {
    host: 'front.google.com', // can be overwritten by process.env.HOST
    port: 80, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    ...
  }
}
```

## 总结一下

1、配置hosts

```
# 后端地址
192.168.1.111 server.google.com
# 前端地址
127.0.0.1 front.google.com
```

2、前端调用后端接口需要用域名+端口方式，例如 http://server.google.com:8080

3、在浏览器访问前端页面也需要用域名+端口的方式，例如 http://front.google.com

4、只要保证配置的两个域名的二级域名一样就可以了，三级域名随便。

5、这种方式只需要配置一次，如果想访问不同环境的后端服务，只需要修改hosts配置就可以了。而且部署前后端分离时，只需要修改前端调用后端接口的配置即可。









---