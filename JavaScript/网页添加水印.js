
const div = document.createElement('div')
div.style = 'opacity: 0.05;position:fixed;top:0;left:0;height:100%;width:100%;pointer-events:none;background-repeat:repeat;'
div.style.backgroundImage = 'url(一张png图片的地址)'
div.style.zIndex = '2147483647'
div.className = 'watermark'
document.body.insertBefore(div, bo.firstChild)

