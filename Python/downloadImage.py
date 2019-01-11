

import os
import requests
import random


os.makedirs('D:/1/image/', exist_ok=True)

imgUrls = [
"https://www.kanjiantu.com/images/2019/01/10/-1b494d679dbc960a1.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-2994e5ba6057bed6f.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-3ddc2bfe13e25d11f.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-4b16c4c2f9625eb2f.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-51534f9bd07029f71.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-66b27deca711f8a2d.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-7a1391b564d56bafa.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-81d1bb171e53c4b92.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-9b59adac0c4c9353e.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-10a597c5b21fc49b9f.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-118b8864a6ae890748.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-12cb4c061fcd6e36be.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-13e27c3382e374b008.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-141d0543044cebdd3c.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-15d67ea2add6dc4799.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-161ab85d84dcd099fe.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-1787e3b3778bb64765.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-18d259006c7f2a5e6d.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-197e6d236557ce1ac0.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-204f413f1f7b8eba6c.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-217aac652a790f2920.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-2214b94decbfedc116.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-23b455291b4020450c.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-24a37849dbaaca1d61.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-25e3243b508ecb4e4e.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-26a99f2c6dc372287f.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-27358ed065b975783b.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-280c26f81ebb46fe45.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-2992afa50c41a51683.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-302498930d22989e3f.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-31771cfdb7b3b514f7.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-32813c17a7556c73c8.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-33987ba74bd84ea9a4.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-34e3cf4f93df78ec8b.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-35c70b0fb193d72fbd.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-36f31e1824848a7227.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-373e204445765ede38.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-38e21293867f2c9b77.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-39b2e8518f614dce2d.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-40ebe05b4052f9212d.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-41a6d3ada05417ecf4.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-427ce10c7b74049c8d.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-432ebbfee9c0a82f0c.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-442095e34dd3189aeb.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-45b278a2fd074c46df.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-46466655e16c4b5a08.jpg",
"https://www.kanjiantu.com/images/2019/01/10/-473317d48028fe59fe.jpg"
]

# for url in imgUrls:
    # print(random.choice('abcdefghijklmnopqrstuvwxyz'))
    # print(''.join(random.sample('zyxwvutsrqponmlkjihgfedcba',10)))

# for url in imgUrls:
#     r = requests.get(url)
#     print(url)
#     # fileName = url[-20,]
#     fileName = ''.join(random.sample('zyxwvutsrqponmlkjihgfedcba',10))
#     with open('D:/1/image/'+fileName, 'wb') as f:
#         f.write(r.content)


files = os.listdir('D:/1/image')#列出当前目录下所有的文件

for fileName in files:
    print(fileName)
    newName = fileName + ".jpg"
    os.rename('D:/1/image/'+fileName, 'D:/1/image/'+newName)


#
