


todo  test

```
import re, json, requests
from tqdm import tqdm # 打印进度条的库
inp = input('请输入复制的抖音分享链接：')  # 如：https://v.douyin.com/JVFp8r5/
url = re.findall('https://v.douyin.com/.*?/', inp)[0]  # 链接解析
res = requests.get(url)
vid = re.findall('/video/(.*?)/', res.url)[0]  # vid解析，vid就是视频id，是我自己定义的
api = f'https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids={vid}' # 调用api
res = requests.get(api).json()
url = res['item_list'][0]['video']['play_addr']['url_list'][0]  # 视频下载链接解析
url = url.replace('/playwm/', '/play/')  # 去水印
res = requests.get(url, headers={'user-agent': 'chrome'})
total_size = round(int(res.headers[\"Content-Length\"])/1024/1024)
with open(f'{vid}.mp4', 'wb') as f:
    for chunk in tqdm(iterable=res.iter_content(1024*1024), total=total_size, unit='KB'):
        f.write(chunk)
```