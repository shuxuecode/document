
# import urllib3
from urllib3 import *

# http = urllib3.PoolManager()
http = PoolManager(timeout=Timeout(connect=2.0, read=2.0))
url = 'http://coolaf.com/tool/params'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}
response = http.request('POST', url, fields={'s': 'stest', 'i': 'test'}, headers=headers)
result = response.data.decode('UTF-8')
print(result)

