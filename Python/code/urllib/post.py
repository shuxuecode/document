
import urllib3

http = urllib3.PoolManager()
url = 'http://www.baidu.com/s'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}
response = http.request('POST', url, fields={'wd': '机器学习', 'l': 'CH'}, headers=headers)
result = response.data.decode('UTF-8')
print(result)

