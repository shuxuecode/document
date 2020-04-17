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

后端配置

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
    public void init(FilterConfig fc) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) resp;
        HttpServletRequest request = (HttpServletRequest) req;
        // 由于本地和测试环境域名+端口号访问 这种方式可以解决端口号跨域问题
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

    @Override
    public void destroy() {
    }

}

```








---