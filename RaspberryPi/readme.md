


## 查询树莓派在局域网的ip


cmd

输入

```shell
for /L %i IN (100,1,115) DO ping -w 2 -n 1 192.168.0.%i
```

然后输入

```
arp -a
```

找到树莓派对应的mac地址即可。


MAC:b8-27-eb-8e-e6-e6



