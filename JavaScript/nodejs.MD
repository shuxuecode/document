## http-server 支持 HTTPS 服务

npm install http-server -g

上面的基本用法 默认是 http 服务，有的时候有特殊需求，需要在 https 协议下进行测试一些代码，这时候就需要进行一些工作开启 https 服务

在当前目录下生产一对 证书 和 密钥； windows下 可以使用 git Bash终端（windows自带的cmd功能太弱）linux、unix可以直接使用

openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem

hs -S

> hs 是 http-server 的缩写，也可以直接使用 http-server

---