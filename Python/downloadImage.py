

import os
import requests
import random


os.makedirs('D:/1/image/', exist_ok=True)

imgUrls = [
"https://sximg.com/u/20190214/15480380.jpg" ,
"https://sximg.com/u/20190214/15480586.jpg" ,
"https://sximg.com/u/20190214/15480721.jpg" ,
"https://sximg.com/u/20190214/15480758.jpg" ,
"https://sximg.com/u/20190214/15480878.jpg" ,
"https://sximg.com/u/20190214/15480980.jpg" ,
"https://sximg.com/u/20190214/15481047.jpg" ,
"https://sximg.com/u/20190214/15481175.jpg" ,
"https://sximg.com/u/20190214/15481296.jpg" ,
"https://sximg.com/u/20190214/15481380.jpg" ,
"https://sximg.com/u/20190214/15481483.jpg" ,
"https://sximg.com/u/20190214/15481556.jpg" ,
"https://sximg.com/u/20190214/15481664.jpg" ,
"https://sximg.com/u/20190214/15481765.jpg" ,
"https://sximg.com/u/20190214/15481857.jpg" ,
"https://sximg.com/u/20190214/15481925.jpg" ,
"https://sximg.com/u/20190214/15482196.jpg" ,
"https://sximg.com/u/20190214/15482225.jpg" ,
"https://sximg.com/u/20190214/15482351.jpg" ,
"https://sximg.com/u/20190214/1548248.jpg" ,
"https://sximg.com/u/20190214/15482563.jpg" ,
"https://sximg.com/u/20190214/15482635.jpg" ,
"https://sximg.com/u/20190214/15482791.jpg" ,
"https://sximg.com/u/20190214/15482889.jpg" ,
"https://sximg.com/u/20190214/15482968.jpg" ,
"https://sximg.com/u/20190214/15483265.jpg" ,
"https://sximg.com/u/20190214/15483350.jpg" ,
"https://sximg.com/u/20190214/1548338.jpg" ,
"https://sximg.com/u/20190214/15483461.jpg" ,
"https://sximg.com/u/20190214/15483539.jpg" ,
"https://sximg.com/u/20190214/15483546.jpg" ,
"https://sximg.com/u/20190214/15483664.jpg" ,
"https://sximg.com/u/20190214/15483722.jpg" ,
"https://sximg.com/u/20190214/15483843.jpg" ,
"https://sximg.com/u/20190214/15483818.jpg" ,
"https://sximg.com/u/20190214/15483939.jpg" ,
"https://sximg.com/u/20190214/15484032.jpg" ,
"https://sximg.com/u/20190214/15484179.jpg" ,
"https://sximg.com/u/20190214/15484299.jpg" ,
"https://sximg.com/u/20190214/15484292.jpg" ,
"https://sximg.com/u/20190214/15484367.jpg" ,
"https://sximg.com/u/20190214/15484351.jpg" ,
"https://sximg.com/u/20190214/15484483.jpg" ,
"https://sximg.com/u/20190214/15484596.jpg" ,
"https://sximg.com/u/20190214/15484627.jpg" ,
"https://sximg.com/u/20190214/15484796.jpg" ,
"https://sximg.com/u/20190214/15484791.jpg" ,
"https://sximg.com/u/20190214/15484813.jpg" 
]

# for url in imgUrls:
    # print(random.choice('abcdefghijklmnopqrstuvwxyz'))
    # print(''.join(random.sample('zyxwvutsrqponmlkjihgfedcba',10)))

for url in imgUrls:
    r = requests.get(url)
    print(url)
    # fileName = url[-20,]
    fileName = ''.join(random.sample('zyxwvutsrqponmlkjihgfedcba',10))
    with open('D:/1/image/'+fileName+'.jpg', 'wb') as f:
        f.write(r.content)


# files = os.listdir('D:/1/image')#列出当前目录下所有的文件
#
# for fileName in files:
#     print(fileName)
#     newName = fileName + ".jpg"
#     os.rename('D:/1/image/'+fileName, 'D:/1/image/'+newName)


#
