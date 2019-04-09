
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

## 输出为PDF

输出为PDF文件，需要先安装gitbook pdf
```
$ npm install gitbook-pdf -g
```

> 如果在安装gitbook-pdf时，觉得下载phantomjs包太慢的话，你可以到phantomjs的官方网站上去下载。

> http://phantomjs.org/

> 这个包的安装方式，参考其官网的说明文档。

然后，用下面的命令就可以生成PDF文件了。
```
$ gitbook pdf
```
如果，你已经在编写的gitbook当前目录，也可以使用相对路径。

```
$ gitbook pdf .
```
然后，你就会发现，你的目录中多了一个名为book.pdf的文件。

## 忽略文件

> 类似于git

> 如果想要忽略某些文件，和 Git 一样， Gitbook 会依次读取 .gitignore, .bookignore 和 .ignore 文件来将一些文件和目录排除。

## 查看帮助
```
 gitbook -h
```



---