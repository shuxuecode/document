
## wiki
https://github.com/lukesampson/scoop/wiki

## 安装

在 PowerShell 中输入下面内容，保证允许本地脚本的执行：
```
set-executionpolicy remotesigned -scope currentuser
```
然后执行下面的命令安装 Scoop：
```
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
```
静待脚本执行完成就可以了，安装成功后，让我们尝试一下：
```
scoop help
```


## 安装annie

```
scoop install annie
```

## 下载视频

```
annie url
```

> 其它命令

annie -i url

annie -f [] url


---

### Specify the output path and name

The -o option sets the path, and -O option sets the name of the downloaded file:
```
$ annie -o ../ -O "hello" https://...
```
---

---