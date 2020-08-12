
# 全局安装 Electron 

npm install electron -g

## 




# 打包

## 全局安装打包神器electron-packager

npm install electron-packager -g

### 最简打包

electron-packager .

打包成功，在当前目录下生成一个新的文件夹，里面生成一堆文件，点击其中的exe，即可启动桌面程序：

```
electron-packager . <可执行文件的文件名> --win --out <打包成的文件夹名> --arch=<x64位还是32位> --version <版本号> --overwrite --ignore=node_modules
```


## 安装electron-builder

npm install electron-builder -g

### 打包

electron-builder --win --x64

打包完成在dist目录生成以下文件：

```
win-unpacked 免安装版
builder-effective-config.yaml 记录打包信息
my-project Setup 0.0.1.exe  安装文件，默认安装在c盘
my-project Setup 0.0.1.exe.blockmap 文件系统索引模式
```



---