

## pre-commit

```shell
#!/bin/bash

# 获取修改文件的列表
changed_files=$(git diff --name-only --cached)

# 打印修改文件的列表
echo "修改的文件:"
echo $changed_files


echo "遍历修改的文件:"
for i in $changed_files
do
echo $i
done

```


#### 下面是一段提交时判断提交内容是否包含特殊字符的命令

```shell
#!/bin/bash

# 获取修改文件的列表
changed_files=$(git diff --name-only --cached)

# 打印修改文件的列表
echo "修改的文件:"
echo $changed_files


echo "遍历修改的文件:"
for i in $changed_files
do
echo $i
done




gitdir=$(git rev-parse --show-toplevel)

echo "当前项目路径"
echo $gitdir


echo "遍历修改的文件内容:"
for i in $changed_files
do
filepath=$gitdir"/"$i
echo $filepath


for j in $( cat $filepath )
do
echo "$j"


str1="$j"
str2="time"
result=$(echo $str1 | grep "${str2}")
if [[ "$result" != "" ]]
then
    echo "包含"
else
    echo "不包含"
fi


done

done

```