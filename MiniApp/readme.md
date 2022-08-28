

## 获取屏幕信息等

	wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
      }
    })


iPhone 6

2

375

571
zh_CN

6.5.6

---

	<view class="d1" style="left : {{d1StyleLeft}}px; top : {{d1StyleTop}}px; height : {{viewHeight}}px; font-size : {{fontSize}}px; line-height : {{lineHeight}}px; background-image: url({{imageSrc}}); background-repeat : no-repeat; background-position-x : 0px; background-position-y : 0px; "
    onclick="move(1)" bindtap="move1">

      <!--1-->
    </view>
