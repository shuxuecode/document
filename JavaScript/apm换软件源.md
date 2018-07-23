
npm的官方源在国内访问起来是非常缓慢的。但是，国内有许多镜像源可以使用，如淘宝源(http://registry.npm.taobao.org/)，CNPM（http://r.cnpmjs.org）。

要设置apm使用的软件源很简单，执行下列命令：

```
apm config set registry npm_mirror_url
```

将上面的npm_mirror_url替换为你想要使用的镜像源。如要使用淘宝源，即可以使用以下命令。

```
apm config set registry http://registry.npm.taobao.org
```


```
> apm config get registry
https://registry.npmjs.org/
> apm config set registry http://registry.npm.taobao.org
```