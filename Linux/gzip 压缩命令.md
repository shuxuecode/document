## gzip 是linux中常见的压缩/解压工具，最常见的使用对象是*.gz格式的文件

```

OPTIONS
 -c --stdout --to-stdout 结果写到标准输出，原文件保持不变

 -d --decompress --uncompress 解压
 -k --keep 压缩或者解压过程中，保留原文件

 -r --recursive

 -t --test 检查压缩文件的完整性

 -v --verbose 显示每个文件的名子和压缩率

 -# --fast --best 取值从-1(最快)到-9(最好)，默认是-6


```

## 压缩文件
原文件名为file1.txt，压缩后原文件消失，压缩后文件名为file1.txt.gz

gzip file1.txt

## 解压文件

gzip -d file1.txt.gz

## 压缩的时候，显示压缩率

gzip -v file1.txt


## 一条命令压缩多个文件，压缩之后，是各自分开的

gzip file1.txt file2.txt

## 压缩过程中，保留原文件

gzip -k file1.txt


## 压缩到标准输出中
可以连接两个文件

gzip -c file1.txt file2.txt > foo.gz



# zip命令

## 压缩

```shell
# 压缩单个文件
zip demo.zip 1.log

zip demo.zip 1.log 2.log

# 压缩多个文件
zip demo.zip *.file

# 压缩目录为zip包 (不加r，只会打包一个文件夹)
zip -r dir.zip dir/

```


## 查看

```shell
# 不解压,仅查看压缩包中的内容
unzip -l demo.zip
```

```shell
查看zip压缩包是否是完整的         
[root@Linux ~]# zip -T  filename.zip
test of filename.zip OK
```

## 解压

```shell
# 解压
unzip demo.zip

# 解压到指定目录
unzip demo.zip -d /opt
```




