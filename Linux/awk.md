## 

## awk命令获取指定列

```
#指定输出第一列和第九列
$ ll | awk -F' ' '{print $1,$9}' #列之间是空格符
$ ll | awk -F',' '{print $1,$9}' #列之间是逗号符

#定输出最后一列
$ ll | awk -F' ' '{print $NF}' #列之间是空格符
$ ll | awk -F',' '{print $NF}' #列之间是逗号符
```


---