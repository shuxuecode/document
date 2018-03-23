import urllib.request as request
from bs4 import BeautifulSoup

html = """
<html><head><title>The Dormouse's story</title></head>
<body>
<p class="title" name="dromouse"><b>The Dormouse's story</b></p>
<p class="story">Once upon a time there were three little sisters; and their names were
<a href="http://example.com/elsie" class="sister" id="link1"><!-- Elsie --></a>,
<a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
<a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
and they lived at the bottom of a well.</p>
<p class="story">...</p>
"""

url = 'http://sched.hebradio.com/play/playback.do?rid=6&pid=108'

response = request.urlopen(url)
html2 = response.read()
data = html2.decode('utf-8')
print(data)

soup = BeautifulSoup(data, "lxml")

# 格式化输出
print( soup.prettify())

print(soup.a)
print(soup.a["href"])

print(soup.find_all("a"))
print(soup.find_all("audio"))

print()
print(soup.audio)
print(soup.audio['src'])

print()
print()
print()
print(soup.select('div[class="calendar"] > div[class="cal_date"]'))

a = 'http://sched.hebradio.com/mp3/yygb/xgmyb/xgmyb2018032222001377.mp3'

print(a.find('/'))
# 返回S中最后出现的substr的第一个字母的标号，如果S中没有substr则返回-1，也就是说从右边算起的第一次出现的substr的首字母标号
print(a.rfind('/'))

num = a.rfind('/')
print(a[num+1:])

# mp3link = soup.audio['src']
#
# music_data = request.urlopen(mp3link).read()
#
# music_path = '/1/1.mp3'
#
# with open(music_path, 'wb') as music_file:
#     music_file.write(music_data)
#
# music_file.close()



#
