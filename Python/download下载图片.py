
import os
import requests


os.makedirs('D:/1/image/', exist_ok=True)

imgUrls = [
"https://wx2.sinaimg.cn/mw690/7cc829d3ly1g1mz0wuvlpg208w053qv5.gif",
"https://wx4.sinaimg.cn/mw690/006FzHykgy1g1ag3cyaogj30v919x1kx.jpg",
"https://wx3.sinaimg.cn/mw690/7a722219gy1fzgdfpkmivj20hs0m7jt4.jpg",
"https://wx3.sinaimg.cn/mw690/7a722219gy1fzgdfpkscmj20hs0m8tb8.jpg",
"https://wx4.sinaimg.cn/mw690/7a722219gy1fzgdfph632j20hs0bmmyc.jpg",
"https://wx2.sinaimg.cn/mw690/7a722219gy1fzgdfpfqtmj20hs0m5ac4.jpg",
"https://wx2.sinaimg.cn/mw690/7a722219gy1fzgdfpb7m4j20hs0hswg4.jpg",
"https://wx3.sinaimg.cn/mw690/7a722219gy1fzgdfpaylrj20hs0hstai.jpg",
"https://wx4.sinaimg.cn/mw690/7a722219gy1fzgdfpdud3j20u011i0v4.jpg",
"https://wx2.sinaimg.cn/mw690/7a722219gy1fzgdfpnh7sj20u011h7ae.jpg" 
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
