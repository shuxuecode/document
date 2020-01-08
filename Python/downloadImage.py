

import os
import requests
import random


os.makedirs('D:/1/image/', exist_ok=True)

imgUrls = [
    
]

# for url in imgUrls:
    # print(random.choice('abcdefghijklmnopqrstuvwxyz'))
    # print(''.join(random.sample('zyxwvutsrqponmlkjihgfedcba',10)))



# for url in imgUrls:
#     r = requests.get(url)
#     print(url)
#     # fileName = url[-20,]
#     fileName = ''.join(random.sample('zyxwvutsrqponmlkjihgfedcba',10))
#     with open('D:/1/image/'+fileName+'.jpg', 'wb') as f:
#         f.write(r.content)

for index, url in enumerate(imgUrls):
    r = requests.get(url)
    print(url)
    fileName = str(index + 1)
    with open('D:/temp/image/'+fileName+'.jpg', 'wb') as f:
        f.write(r.content)

# files = os.listdir('D:/1/image')#列出当前目录下所有的文件
#
# for fileName in files:
#     print(fileName)
#     newName = fileName + ".jpg"
#     os.rename('D:/1/image/'+fileName, 'D:/1/image/'+newName)


#
