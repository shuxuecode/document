

## 基于APT源安装

- 命令：

> 注意要先update   `apt-get update`

```
sudo apt-get install nginx
```

安装好的文件位置：

```
/usr/sbin/nginx：主程序

/etc/nginx：存放配置文件

/usr/share/nginx：存放静态文件

/var/log/nginx：存放日志
```

> 其实从上面的根目录文件夹可以知道，Linux系统的配置文件一般放在/etc，日志一般放在/var/log，运行的程序一般放在/usr/sbin或者/usr/bin。

如果忘记了nginx程序目录，可以执行：

```
whereis nginx
```

---

Nginx如果指定默认加载`/etc/nginx/nginx.conf`的配置文件。如果要查看加载的是哪个配置文件，可以用这个命令sudo nginx -t或者ps -ef | grep nginx

---

然后通过这种方式安装的，会自动创建服务，会自动在/etc/init.d/nginx新建服务脚本，然后就可以使用

```
sudo service nginx {start|stop|restart|reload|force-reload|status|configtest|rotate|upgrade}
```

的命令操作。


## nginx.conf配置文件


### 配置多个域名

```
server{
	listen 80;
	server_name aaa.aliyun.com;
	location / {
		proxy_pass  http://localhost:8081;
    }
}

server{
	listen 80;
	server_name bbb.aliyun.com;
	location / {
		proxy_pass  http://localhost:8088/appName/;
    }
}

```


### https配置SSL证书

将证书上传在服务器上，这里路径为：`/usr/nginx/cert/`

下面配置中`ssl`开头的都是必要的

```
server {
    listen       443;
    server_name www.aliyun.xyz;

    ssl on;

    ssl_certificate   /usr/nginx/cert/20180529001002.pem;
    ssl_certificate_key  /usr/nginx/cert/20180529001002.key;

    ssl_session_timeout  5m;

    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://localhost:8080;

        proxy_set_header Host $host;
    }
}
```


### 同一域名配置多个服务（根据url）

这种情况可以解决同一个域名提供多个网站服务的问题，比如：
- 地址栏输入 http://aliyun.xyz  访问的是网站A
- 地址栏输入 http://aliyun.xyz/wechat  访问的是网站B

```
server {
       listen       80;
       server_name aliyun.xyz;

       location / {
           root   html;
           index  index.html index.htm;
           proxy_pass http://localhost:8080;

           proxy_set_header Host $host;
       }

       location /wechat {
          proxy_pass http://localhost:18080;

          proxy_set_header Host $host;
       }

       location /funimg {
          proxy_pass http://localhost:28080/funimg/;
          proxy_set_header Host $host;
       }
}
```

### 上传文件的时候遇到413错误 :Request Entity Too Large

原因是nginx限制了上传文件的大小，默认是1MB。

在http{}配置项中，添加

```    
client_max_body_size 50m;
```

表示最大为50MB。




---

> 未完待续
---
