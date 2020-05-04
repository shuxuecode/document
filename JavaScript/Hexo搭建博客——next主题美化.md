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


## 添加本地搜索

```
# Local Search
# Dependencies: https://github.com/theme-next/hexo-generator-searchdb
local_search:
  enable: true
```  











































































































---