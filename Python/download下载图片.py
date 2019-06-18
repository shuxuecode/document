
import os
import requests


os.makedirs('D:/1/image/', exist_ok=True)

imgUrls = [
"https://www.yuoimg.com/u/20190614/02064491.gif",
"https://www.yuoimg.com/u/20190614/02064582.gif",
"https://www.yuoimg.com/u/20190614/02064962.gif",
"https://www.yuoimg.com/u/20190614/02065379.gif",
"https://www.yuoimg.com/u/20190614/02065574.gif",
"https://www.yuoimg.com/u/20190614/02065847.gif",
"https://www.yuoimg.com/u/20190614/02070139.gif",
"https://www.yuoimg.com/u/20190614/02070411.gif",
"https://www.yuoimg.com/u/20190614/02070853.gif",
"https://www.yuoimg.com/u/20190614/02071093.gif",
"https://www.yuoimg.com/u/20190614/02071680.gif",
"https://www.yuoimg.com/u/20190614/0207194.gif",
"https://www.yuoimg.com/u/20190614/0207228.gif",
"https://www.yuoimg.com/u/20190614/02072563.gif",
"https://www.yuoimg.com/u/20190614/02072982.gif",
"https://www.yuoimg.com/u/20190614/02073164.gif"
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
