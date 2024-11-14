# nginx 


官方网站
https://nginx.org/en/docs/configure.html

## 在nginx.exe目录，打开命令行工具

```
start nginx : 启动nginx
nginx -s reload  ：修改配置后重新加载生效
nginx -s reopen  ：重新打开日志文件
nginx -t -c /path/to/nginx.conf 测试nginx配置文件是否正确

关闭nginx：
nginx -s stop  :快速停止nginx
nginx -s quit  ：完整有序的停止nginx


```


## linux查看nginx安装目录

whereis nginx

## 代理设置

重点是配置 resolver
不要出现server_name指令

```
#代理服务设置
server {
    listen 81;   #监听的端口

    resolver 8.8.8.8;  #可用的DNS
    
    location / { 
        proxy_pass http://$http_host$request_uri;
    }   
}

```


--prefix=/usr/share/nginx --conf-path=/etc/nginx/nginx.conf --http-log-path=/var/log/nginx/access.log --error-log-path=/var/log/nginx/error.log --lock-path=/var/lock/nginx.lock --pid-path=/run/nginx.pid --modules-path=/usr/lib/nginx/modules --http-client-body-temp-path=/var/lib/nginx/body --http-fastcgi-temp-path=/var/lib/nginx/fastcgi --http-proxy-temp-path=/var/lib/nginx/proxy --http-scgi-temp-path=/var/lib/nginx/scgi --http-uwsgi-temp-path=/var/lib/nginx/uwsgi --with-debug --with-pcre-jit --with-http_ssl_module --with-http_stub_status_module --with-http_realip_module --with-http_auth_request_module --with-http_v2_module --with-http_dav_module --with-http_slice_module --with-threads --with-http_addition_module --with-http_geoip_module=dynamic --with-http_gunzip_module --with-http_gzip_static_module --with-http_image_filter_module=dynamic --with-http_sub_module --with-http_xslt_module=dynamic --with-stream=dynamic --with-stream_ssl_module --with-mail=dynamic --with-mail_ssl_module --add-module=/data/soft/ngx_http_proxy_connect_module


--prefix=/usr/share/nginx --conf-path=/etc/nginx/nginx.conf --http-log-path=/var/log/nginx/access.log --error-log-path=/var/log/nginx/error.log --lock-path=/var/lock/nginx.lock --pid-path=/run/nginx.pid --modules-path=/usr/lib/nginx/modules --http-client-body-temp-path=/var/lib/nginx/body --http-fastcgi-temp-path=/var/lib/nginx/fastcgi --http-proxy-temp-path=/var/lib/nginx/proxy --http-scgi-temp-path=/var/lib/nginx/scgi --http-uwsgi-temp-path=/var/lib/nginx/uwsgi --with-debug --with-pcre-jit --with-http_ssl_module --with-http_stub_status_module --with-http_realip_module --with-http_auth_request_module --with-http_v2_module --with-http_dav_module --with-http_slice_module --with-threads --with-http_addition_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_image_filter_module=dynamic --with-http_sub_module --with-http_xslt_module=dynamic --with-stream=dynamic --with-stream_ssl_module --with-mail=dynamic --with-mail_ssl_module --add-module=/data/soft/ngx_http_proxy_connect_module


---


下载nginx源码包

[下载地址](https://nginx.org/download/nginx-1.26.2.tar.gz)


解压

tar -zxvf nginx-1.26.2.tar.gz

cd nginx-1.26.2

创建Nginx目录

mkdir /usr/share/nginx

编译 `./configure`


./configure --sbin-path=/usr/share/nginx/nginx --conf-path=/usr/share/nginx/nginx.conf --pid-path=/usr/share/nginx/nginx.pid



make


make install

---



Nginx 配置

nginx.conf

```
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for" "$request_id"';

    server {
       listen 80;

       location / {

           add_header X-Trace-Id $request_id;

           # 将自定义头 X-Trace-Id 传递给后端
           proxy_set_header X-Trace-Id $request_id;


           # 转发请求到 Spring Boot 服务，假设运行在 localhost:8080
           proxy_pass http://localhost:8080;
       }
   }

```

