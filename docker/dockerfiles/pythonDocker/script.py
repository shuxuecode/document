
import urllib3

import json

http = urllib3.PoolManager()
# url = 'http://www.baidu.com/s'
url = 'https://shuxuecode.github.io/html/data/list.json'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}
# response = http.request('GET', url, fields={'wd': '机器学习'}, headers=headers)
response = http.request('GET', url, fields={'t': '123456'}, headers=headers)
result = response.data.decode('UTF-8')
print(result)

list = json.loads(result)

print(list)

for item in list:
    print(item)
    print(item['id'])



file = open('data.json', 'w')
# file.write('test')
# file.write('\n')
# file.write('demo')
# file.write('\n')
file.write(result)
file.close()