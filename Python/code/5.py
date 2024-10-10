
import requests


url = 'https://www.baidu.com'

resp = requests.get(url)

# print(resp.text)
print(resp.content)

if resp.status_code == 200:
    print('success')
    print('返回内容：', resp.text) # 打印返回的HTML内容
else:
    print('fail:状态码=', resp.status_code)
