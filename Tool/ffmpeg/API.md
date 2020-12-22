## 安装，升级命令

sudo apt-get update
sudo apt-get install ffmpeg



## 改变视频尺寸

在命令行中输入
ffmpeg -i "D:/tmp/测试/视频/movie.mp4" -vf scale=800:-1 D:/download/test.mp4
然后敲回车键



## 压缩视频的方式