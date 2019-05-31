

docker pull mobz/elasticsearch-head:5


先修改 elsasticsearch.yml，

```
http.cors.enabled: true
http.cors.allow-origin: "*"
network.host: 0.0.0.0
```

另外启动容器后，进入容器，打开 /usr/src/app/Gruntfile.js 文件，修改

```
connect: {
    server: {
        options: {
            /* 默认监控：127.0.0.1,修改为：0.0.0.0 */
            hostname: '0.0.0.0',
            port: 9100,
            base: '.',
            keepalive: true
        }
    }
}
```

启动 

docker run -d --name es-head -p 9100:9100 mobz/elasticsearch-head:5

浏览器打开

http://localhost:9100/


Github地址

https://github.com/mobz/elasticsearch-head

