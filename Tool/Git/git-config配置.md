## git 统计需要本地git邮箱跟账号邮箱一致

查看
git config user.name
git config user.email

修改

单个项目的
git config user.name yourname
git config user.email youremail

全局的
git config --global user.name yourname
git config --global user.email youremail


---

## 多用户配置

git-config的官网巨长文档，开发人员经常遇到这样的问题，我们的公司仓库和个人仓库的用户名和邮箱配置是有区别的，为了能够很好地区分工程上传到不同的远程仓库，我们需要分别处理，保证在不同的工程使用不同的账户

- 按工程配置多用户
- 按目录配置多用户

### 按工程配置多用户
目前git的配置变量可以放在三个地方：

- /etc/gitconfig 系统配置,对所有用户都生效。
- ~/.gitconfig 用户配置，仅对当前用户生效。

```
git config --global user.name "yourName"
git config --global user.email "yourEmail"
```

- projectRootPath/.git/config 项目根目录配置，仅对当前项目生效。对应：进入工程根目录执行

```
git config user.name "yourName"
git config user.email "yourEmail"
```

三层是从3-2-1的优先级处理的，这样我们可以对不同工程完成不同的配置，这个在工程数量多的时候简直不忍直视，所以需要寻找更好的方法。

#### 使用命令查看配置

- git config --local -l 查看仓库配置
- git config --global -l 查看用户配置
- git config --system -l 查看系统配置

#### 编辑配置文件

- git config --local -e 编辑仓库级别配置文件
- git config --global -e 编辑用户级别配置文件
- git config --system -e 编辑系统级别配置文件


### 按目录配置多用户
在2017年，git新发布的版本2.13.0包含了一个新的功能includeIf配置，可以把匹配的路径使用对应的配置用户名和邮箱；

在~/目录下面存在三个配置文件，

- .gitconfig // 全局通用配置文件
- .gitconfig-self // 个人工程配置文件
- .gitconfig-work // 公司工程配置文件

全局通用配置文件~/.gitconfig里面的内容是：主要是通过includeIf配置匹配不用的目录映射到不同配置文件上，

```
[includeIf "gitdir:~/self-workspace/"]
    path = .gitconfig-self
[includeIf "gitdir:~/workspace/"]
    path = .gitconfig-work
```

个人工程配置文件~/.gitconfig-self：

```
[user]
    name = yourname-self
    email = yourname-self@gmail.com
```

公司工程配置文件~/.gitconfig-work：

```
[user]
    name = yourname-work
    email = yourname-work@yourCompanyName.com
```

遇到的问题：

- 文件~/.gitconfig里面的includeIf后面的path最后需要/结尾
- 文件~/.gitconfig里面原有的user部分需要删除
- 个人工程目录和公司工程目录需要要求是非包含关系，就是这两个工程目录配置路径不可以是父子关系。
