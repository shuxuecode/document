

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