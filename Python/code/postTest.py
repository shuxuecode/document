import requests

url = 'https://www.baidu.com'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
    'Authorization': 'Bearer 123456'
}

resp = requests.post(url, headers=headers)

if resp.status_code == 200:
    print('success')
    print('返回内容2：', resp.text) # 打印返回的HTML内容
else:
    print('fail:状态码=', resp.status_code)