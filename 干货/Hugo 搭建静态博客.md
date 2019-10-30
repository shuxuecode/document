

## 安装hugo

https://github.com/gohugoio/hugo/releases
下载对应系统的版本


## 创建网站

```
hugo new site <blog>
```

## 新建文章

```
hugo new post/1.md
```

## 修改主题Theme

在根目录

```
cd <blog>
git clone https://github.com/xianmin/hugo-theme-jane.git --depth=1 themes/jane
```

## 启动

hugo server

## 打开网址 http://localhost:1313

## 部署

hugo

命令会生成静态网站到public/目录，把它复制到github仓库里push到github即可。


## 文章配置

把 draft: false 才能发布成功

```
```
```
```


---