
## 初始化
```
gitbook init
```
在使用 `gitbook init` 之后本地会生成两个文件 README.md 和 SUMMARY.md ，这两个文件都是必须的，一个为介绍，一个为目录结构。


## 本地预览

在根目录执行：
```
gitbook serve
```
`gitbook serve` 命令实际会先调用 `gitbook build` 编译书籍，完成后打开 web 服务器，默认监听本地 4000 端口，在浏览器打开 http://localhost:4000 即可浏览电子书。


## 发布电子书
```
gitbook build
gitbook build ./{book_name} --output=./{outputFolde}
gitbook build ./ --log=debug --debug
```
当电子书内容制作好之后，可以使用如下命令来生成 HTML 静态网页版电子书。该命令会在当前文件夹中生成 _book 文件夹，这个文件夹中的内容就是静态网页版电子书。

使用 --log=debug --debug 可以用来调试，会打印出 stack trace。

## 查看帮助
```
 gitbook -h
```



---