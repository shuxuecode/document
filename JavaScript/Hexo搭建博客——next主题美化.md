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

























































































































---