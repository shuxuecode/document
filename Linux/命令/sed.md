## sed
sed 是 Linux 和 Unix 系统上的一个流编辑器，用于对输入流（或文件）进行基本的文本转换。它可以通过脚本或命令行来处理文本，通常用于查找、替换、删除或添加文本到文件。



### 替换文本：

替换每行中首次出现的 "old" 为 "new"：

```bash
sed 's/old/new/' file.txt
```
替换每行中所有出现的 "old" 为 "new"：

```bash
sed 's/old/new/g' file.txt
```
替换第 2 行中首次出现的 "old" 为 "new"：

```bash
sed '2s/old/new/' file.txt
```
替换匹配 "pattern" 的行中的 "old" 为 "new"：

```bash
sed '/pattern/s/old/new/' file.txt
```


### 删除文本：

删除包含 "pattern" 的行：

```bash
sed '/pattern/d' file.txt
```
删除第 2 行：

```bash
sed '2d' file.txt
```
删除从第 2 行到第 4 行的内容：

```bash
sed '2,4d' file.txt
```
### 添加文本：

在每行末尾添加 "new_text"：

```bash
sed 's/$/new_text/' file.txt
```
在匹配 "pattern" 的行末尾添加 "new_text"：

```bash
sed '/pattern/s/$/new_text/' file.txt
```
在第 2 行前插入 "new_line"：

```bash
sed '2i\new_line' file.txt
```
在第 2 行后追加 "new_line"：

```bash
sed '2a\new_line' file.txt
```


### 修改文件并保存：

默认情况下，sed 会输出到标准输出（即终端或命令行界面）。如果你希望直接修改文件并保存更改，可以使用 -i 选项（注意：这会直接修改文件，所以在使用前请确保你有备份或确信更改是正确的）：

```bash
sed -i 's/old/new/g' file.txt
```
使用多个编辑命令：
你可以使用分号 ; 在同一个 sed 命令中分隔多个编辑命令。例如，同时删除第 2 行和将 "old" 替换为 "new"：

```bash
sed '2d;s/old/new/g' file.txt
```





todo


---