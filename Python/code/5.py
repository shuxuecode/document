
import requests


url = 'https://www.baidu.com'

resp = requests.get(url)

# print(resp.text)
print(resp.content)
