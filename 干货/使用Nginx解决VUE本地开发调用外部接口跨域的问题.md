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









