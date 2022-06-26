
import os
import requests


os.makedirs('D:/1/image/', exist_ok=True)

imgUrls = [
"https://www.123.com/u/123/123.gif",
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
