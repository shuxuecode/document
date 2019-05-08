
import os
import requests
import random


os.makedirs('D:/1/image/', exist_ok=True)

imgUrls = [
"https://wx3.sinaimg.cn/mw690/79a00895ly1fz2sduxi5jg208t08tnpp.gif",
"https://wx2.sinaimg.cn/mw690/cfce7b59ly1g1ylbqr4mbj20ew0a574u.jpg",
"https://wx4.sinaimg.cn/mw690/a8d43f7ely1g1yuquqiqoj20gi0i8tah.jpg",
"https://wx1.sinaimg.cn/mw690/79a00895ly1g1oab03f8sg206x096hdt.gif",
"https://wx4.sinaimg.cn/mw690/006q9cGPly1g1lopfbq21g30a80i8npg.gif",
"https://wx1.sinaimg.cn/mw690/005G09gzly1g16tp9svicj30j70o0tcq.jpg",
"https://wx1.sinaimg.cn/mw690/94525930gy1fwlth0zcd8g20hs0a0npd.gif",
"https://wx4.sinaimg.cn/mw690/6e7905a7gy1g1fxvzadzfg20fs08wu14.gif",
"https://wx1.sinaimg.cn/mw690/6e7905a7gy1g1fxuybs50g207w09jb29.gif",
"https://wx3.sinaimg.cn/mw690/92ce84baly1g1u4pggbl7g20650aykjl.gif",
"https://wx2.sinaimg.cn/mw690/79a00895ly1g1f6clge7sg204305ku0x.gif",
"https://wx1.sinaimg.cn/mw690/79a00895gy1g1ubvkim6vg205c0744qp.gif" 
]

# for url in imgUrls:
    # print(random.choice('abcdefghijklmnopqrstuvwxyz'))
    # print(''.join(random.sample('zyxwvutsrqponmlkjihgfedcba',10)))

for url in imgUrls:
    r = requests.get(url)
    print(url)
    index = url.rfind('/')
    fileName = url[index+1:]
    # fileName = url[-20,]
    # fileName = ''.join(random.sample('zyxwvutsrqponmlkjihgfedcba',10))
    print(fileName)

    with open('D:/1/image/'+fileName, 'wb') as f:
        f.write(r.content)





#
