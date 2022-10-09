

## git删除线上文件

```shell
$ git rm --cached ".settings/*"
rm 'spring-boot-registry/.settings/.jsdtscope'
rm 'spring-boot-registry/.settings/org.eclipse.core.resources.prefs'
rm 'spring-boot-registry/.settings/org.eclipse.jdt.core.prefs'
rm 'spring-boot-registry/.settings/org.eclipse.m2e.core.prefs'
rm 'spring-boot-registry/.settings/org.eclipse.wst.common.component'
rm 'spring-boot-registry/.settings/org.eclipse.wst.common.project.facet.core.prefs.xml'
```


提交即可


## 删除

对于不小心提交了没用的文件后，

```
执行  git rm --cached springBootWeb.iml  删除文件

执行  git rm -r --cached target/  删除文件夹

git add .
git commit -m 'delete'
git push
```

## 彻底清除所有历史提交记录

### 1.创建新分支
```
git checkout --orphan <new_branch>
```

### 2.添加所有文件
```
git add .
```

### 3.提交代码
```
git commit -m init
```

### 4.删除原来的主分支
```
git branch -D master
```

### 5.把当前分支重命名为master
```
git branch -m master
```

### 6.推送到远程仓库
```
git push -f origin master
```

