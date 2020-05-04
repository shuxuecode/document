# 进入themes/next文件夹,修改_config.yml

## 修改导航菜单

```
menu:
  home: / || fa fa-home
  #about: /about/ || fa fa-user
  #tags: /tags/ || fa fa-tags
  #categories: /categories/ || fa fa-th
  archives: /archives/ || fa fa-archive
  #schedule: /schedule/ || fa fa-calendar
  #sitemap: /sitemap.xml || fa fa-sitemap
  #commonweal: /404/ || fa fa-heartbeat
```  

去掉 `#about #tags #categories` 三个的注释，并在下面创建它们

### 创建归档页面

```
hexo new page categories
```

### 创建标签页

```
hexo new page tags
```

### 创建个人主页

```
hexo new page about
```


## 设置头像

```
# Sidebar Avatar
avatar:
  # Replace the default image and set the url here.
  url: /images/avatar.gif
```

## 添加 链接

```
# Social Links
# Usage: `Key: permalink || icon`
# Key is the link label showing to end users.
# Value before `||` delimiter is the target permalink, value after `||` delimiter is the name of Font Awesome icon.
social:
  GitHub: https://github.com/zhaoshuxue || fab fa-github
  E-Mail: mailto:zhaoshuxue@163.com || fa fa-envelope
```  

## 外链

```
links:
  Title: http://yoursite.com
```  

## 添加 Follow me on GitHub

```  
# `Follow me on GitHub` banner in the top-right corner.
github_banner:
  enable: true
  permalink: https://github.com/yourname
  title: Follow me on GitHub
```  


## 添加本地搜索 todo

### 安装 hexo-generator-search

```
npm install hexo-generator-search --save
```

### 安装 hexo-generator-searchdb

```
npm install hexo-generator-searchdb --save
```

### 编辑 站点配置文件，新增以下内容到任意位置：

```
# 开启本地搜索
search:
  path: search.xml
  field: post
  content: true
  format: html
  limit: 10000
```

### next主题配置文件中修改  local_search.enable=true

```
# Local Search
# Dependencies: https://github.com/theme-next/hexo-generator-searchdb
local_search:
  enable: true
```  

## 添加字数统计和阅读时长

### 安装hexo-symbols-count-time

```  
npm install hexo-symbols-count-time --save
```  

### 在站点配置文件添加如下配置

```
symbols_count_time:
  symbols: true                # 文章字数统计
  time: true                   # 文章阅读时长
  total_symbols: true          # 站点总字数统计
  total_time: true             # 站点总阅读时长
  exclude_codeblock: false     # 排除代码字数统计
```

### 在NexT主题配置文件添加如下配置（NexT主题已支持该插件，有的话无需再添加）

```
# Post wordcount display settings
# Dependencies: https://github.com/theme-next/hexo-symbols-count-time
symbols_count_time:
  separated_meta: true     # 是否另起一行（true的话不和发表时间等同一行）
  item_text_post: true     # 首页文章统计数量前是否显示文字描述（本文字数、阅读时长）
  item_text_total: false   # 页面底部统计数量前是否显示文字描述（站点总字数、站点阅读时长）
  awl: 4                   # Average Word Length
  wpm: 275                 # Words Per Minute（每分钟阅读词数）
  suffix: mins.
```




---

# 其它

给hexo静态博客添加RSS - 简书
https://www.jianshu.com/p/a79422ab2013










































































































---