
##


想要知道FFmpeg到底支持哪些格式吗？执行ffmpeg –formats即可


## 图像相关

### 截取一张352x240尺寸大小的，格式为jpg的图片

```
ffmpeg -i test.asf -y -f image2 -t 0.001 -s 352x240 a.jpg
```


### 把视频的前30帧转换成一个Animated Gif

```
ffmpeg -i test.asf -vframes 30 -y -f gif a.gif
```


### 截取指定时间的缩微图,-ss后跟的时间单位为秒

```
ffmpeg -i test.avi -y -f image2 -ss 8 -t 0.001 -s 350x240 test.jpg
```

## 命令

### 1、将视频 MP4 转化为 GIF

```
ffmpeg -i small.mp4 small.gif
```

### 2、转化视频中的一部分为 GIF
```
ffmpeg -t 3 -ss 00:00:02 -i small.webm small-clip.gif
```
从视频中第二秒开始，截取时长为3秒的片段转化为 gif

### 3、转化高质量 GIF
默认转化是中等质量模式，若要转化出高质量的 gif，可以修改比特率

```
ffmpeg -i small.mp4 -b 2048k small.gif
```

### ss 2 -t 5，从第2秒的地方开始，往后截取5秒钟, -r 用于设定帧数. 通常Gif有15帧左右就比较流畅了

```
ffmpeg -ss 2 -t 5 -i output1.mp4 -s 272x480 -r 15 output1.gif
```

## 网络文章

```

可以简单地执行下面的命令行：

ffmpeg -ss 25 -t 10 -i D:\Media\bear.wmv -f gif D:\a.gif

意思是：将D:\Media目录下的源文件bear.wmv，从第25秒的位置开始，截取10秒长度的视频转成GIF文件，保存为D:\a.gif。

问题来了，你的源文件可能是1080P的高清视频，帧率可能还比较高。为了便于网络分享，GIF文件最好小一点。于是，我们需要使用-s参数来进行图像的缩放，使用-r参数来限制目标文件的帧率。命令行如下：

ffmpeg -ss 25 -t 10 -i D:\Media\bear.wmv -s 320x240 -f gif -r 1 D:\b.gif

把b.gif拖进浏览器预览，结果发现：虽然帧率降到了1 fps（从源视频里每隔一秒抽取一帧图像输出到目标文件），整个动画播放还是持续了10秒钟，看着很揪心！能不能在源视频跳帧的情况下同时提高GIF的播放速率呢（比如说在2秒内播完）？查了一遍FFmpeg的说明文档，似乎没有哪个参数可以快速达到这样的目的。也罢，那就分两步走吧：

首先，执行ffmpeg -ss 25 -t 10 -i D:\Media\bear.wmv -r 1 -s 320x240 -f image2 D:\foo-%03d.jpeg，从源视频中每秒钟抽取一帧图像，保存为一系列JPEG文件。然后，再执行ffmpeg -f image2 -framerate 5 -i D:\foo-%03d.jpeg D:\c.gif，将这一系列JPEG图像合成为帧率5 fps的GIF文件。Bingo!

上面提到，把GIF文件拖进浏览器可以进行预览。当然，使用ffplay.exe工具也是可以的——命令行：ffplay D:\a.gif。



p.s. 附送一条指令：截取视频内任意时间点（比如第16.1秒处）的一帧图像保存为JPEG文件：ffmpeg -ss 16.1 -i D:\Media\bear.wmv -s 320x240 -vframes 1 -f image2 D:\d.jpeg


```

## 获取视频第一帧

```
ffmpeg.exe -i 000.mp4 -r 1 -vframes 1 -f image2 123456.jpg
```

> -r 指定抽取的帧率，即从视频中每秒钟抽取图片的数量。1代表每秒抽取一帧。
-f 指定保存图片使用的格式，可忽略。
-vframes 指定抽取的帧数

---





































---
