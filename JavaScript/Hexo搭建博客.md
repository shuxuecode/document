## 安装Hexo

```
npm install hexo-cli -g  
npm install hexo-deployer-git --save  
```

第二个命令表示安装 hexo 部署到 git page 的 deployer

## Hexo初始化

```
hexo init <folder>
```

## 运行

```
hexo g  #生成或 hexo generate  生成的静态文件在 /***/public 目录下 
hexo d  #启动本地服务器 或者 hexo server,这一步之后就可以通过http://localhost:4000  查看了
```

## 配置

官网文档：
https://hexo.io/zh-cn/docs/configuration



## 部署到Github

> 找到github的ssh链接

打开文件夹下的 _config.yml 文件

```
deploy: 
    type: git
    repository: git@github.om:XXX.git
    branch: master
```

执行 `hexo g -d` 就会部署到github上了。

## 新建文章

```
hexo n "文章标题"

hexo new "文章名" #新建文章
hexo new page "页面名" #新建页面 
```

会在项目 \Hexo\source\_posts 中生成 文章标题.md 文件，
也可以直接在 \Hexo\source\_posts 目录下右键鼠标新建文本文档，改后缀为 .md 即可，这种方法比较方便。


## 更换主题

https://hexo.io/themes/

把下载的主题文件夹`hexo-theme-aero-dual`放到 themes 目录下即可。
打开`_config.yml`配置文件，修改参数为：theme：hexo-theme-aero-dual （其他主题修改成相应名称即可）

## 使用Next主题

https://theme-next.org/
https://github.com/theme-next

### 主题安装

```
cd hexo   # 进入博客根目录
git clone https://github.com/theme-next/hexo-theme-next themes/next
```

Set theme in main Hexo root config _config.yml file:

```
theme: next
```

### Next配置

编辑 /***/themes/next/_config.yml（其中***为博客根目录）文件


## 配置域名

编辑CNAME文件，内容为域名




```
常用简写

hexo n == hexo new
hexo g == hexo generate
hexo s == hexo server
hexo d == hexo deploy
```

参考文章：

- https://blog.csdn.net/qq_36759224/article/details/82121420

---