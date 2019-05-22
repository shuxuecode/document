# -*- coding:UTF-8 -*-

import os
import requests
from lxml import etree

# 创建存放图片的文件夹
imgFilePath = 'D:/1/image/'
os.makedirs(imgFilePath, exist_ok=True)
# 防止403
headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.63 Safari/537.36'}



# 得到每篇文章的链接url
def getHTML(url):
    list = []
    req = requests.get(url, headers=headers, timeout=60)
    if(req.status_code == 200):
        # print(req)
        html = req.text
        root = etree.HTML(html)
        a = root.xpath("//a[contains(@class,'header')]")
        for ele in a:
            # print(ele)
            # ele.attrib['href']
            list.append(ele.attrib['href'])
    return list


# 得到图片的地址
def getImgUrl(url):
    req = requests.get(url, headers=headers, timeout=60)
    if(req.status_code == 200):
        root = etree.HTML(req.text)
        # strong = root.xpath("//strong[contains(text(),'小树医生心理生理医务室')]")[0]
        # print(strong)
        # p = strong.xpath("../following-sibling::p[1]/img")
        # print(p)
        # print(p[0].attrib['src'])
        # return p[0].attrib['src']

        return root.xpath("//strong[contains(text(),'小树医生心理生理医务室')]/../following-sibling::p[1]/img/attribute::src")[0]
    return ''

# 下载
def download(imgUrl):
    r = requests.get(imgUrl)
    index = imgUrl.rfind('/')
    imgName = imgUrl[index+1:]
    print(imgName)

    with open(imgFilePath + imgName, 'wb') as f:
        f.write(r.content)

url = 'https://my.oschina.net/xxiaobian/widgets/_space_index_newest_blog?p='

#
if __name__ == "__main__":

    for i in range(1,2):
        urls = getHTML(url + str(i))
        print(urls)
        for blogUrl in urls:
            imgUrl = getImgUrl(blogUrl)
            print(imgUrl)
            if(imgUrl != ''):
                download(imgUrl)
