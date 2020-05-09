## 查看git上的个人代码量：

```
git log --author="username" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -
```

## 统计每个人增删行数

```
git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done
```

## 查看仓库提交者排名前 5

```
git log --pretty='%aN' | sort | uniq -c | sort -k1 -n -r | head -n 5
```

## 贡献值统计

```
git log --pretty='%aN' | sort -u | wc -l
```

## 提交数统计

```
git log --oneline | wc -l
```

## 添加或修改的代码行数：

```
git log --stat|perl -ne 'END { print $c } $c += $1 if /(\d+) insertions/'
```











---