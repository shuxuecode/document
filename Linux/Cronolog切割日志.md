# 下载cronolog-1.6.2.tar.gz

# 安装

```
# tar zxvf cronolog-1.6.2.tar.gz
# cd cronolog-1.6.2
# ./configure
# make
# make install

```

# 3、测试

查看 cronolog 安装后所在目录，验证安装是否成功：

```
# which cronolog

```

一般情况下显示为：/usr/local/sbin/cronolog


# 4、修改catalina.sh

- 1

把

```
if [ -z "$CATALINA_OUT" ] ; then
  CATALINA_OUT="$CATALINA_BASE"/logs/catalina.out
fi
```

改为：

```
if [ -z "$CATALINA_OUT" ] ; then
  CATALINA_OUT="$CATALINA_BASE"/logs/catalina.out.%Y-%m-%d
fi
```


- 2 注释掉

```
#  touch "$CATALINA_OUT"
```



- 3 修改 两处一模一样的

```
org.apache.catalina.startup.Bootstrap "$@" start \
>> "$CATALINA_OUT" 2>&1 "&"
```

改为：

```
org.apache.catalina.startup.Bootstrap "$@" start 2>&1 \
| /usr/sbin/cronolog "$CATALINA_OUT" >> /dev/null &
```

















---

