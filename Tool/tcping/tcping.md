在日常玩服务器过程中，我们经常需要测试一下IP或者域名的延迟，一般直接PING 域名或IP即可~

这种 PING 实际上走的是ICMP协议，其实我们用的最多的是TCP协议。如果直接测试TCP协议的网络延迟，应该是更准确的！

下面本文介绍一款工具，TCPing，不仅可以使用TCP协议的延迟，还能检测端口的连通情况。对于一些禁PING的域名或者IP，我可以直接利用TCPing来查看延迟情况！

Windows版:
下载地址：https://www.elifulkerson.com/projects/tcping.php
安装步骤：下载 tcping.exe 文件到 C:\Windows\System32\ 即可！
命令介绍：打开CMD命令控制台，输入 tcping



```
tcping [命令参数] 服务器地址(IP/域名) [服务器端口]

-t    : 连续 TCPing ，直到使用 Ctrl+C 键停止
示例：tcping -t 1.1.1.1 80

-n 5  : TCPing 5次后停止
示例：tcping -n 5 1.1.1.1 80

-i 5  : 每隔 5秒 TCPing 一次
示例：tcping -i 5 1.1.1.1 80

-w 0.5 : 设置超时时间为 0.5秒（1秒=1000毫秒），单位 秒
示例：tcping -w 0.5 1.1.1.1 80

-d    : 在每行返回信息中加入时间信息
示例：tcping -d 1.1.1.1 80

-s    : 当 TCPing 测试成功后（在超时时间以内返回 TCPing 延迟数据）自动停止 TCPing
示例：tcping -s 1.1.1.1 80

-4    : 优先 IPv4（如果一个域名有 IPv4 和 IPv6 解析，那么走 IPv4）
示例：tcping -4 [url]www.google.com[/url] 80

-6    : 优先 IPv6（如果一个域名有 IPv4 和 IPv6 解析，那么走 IPv6）
示例：tcping -6 [url]www.google.com[/url] 80

--file : TCPing 将逐行循环遍历文件内的 服务器IP/域名 信息（一行一个，支持端口，例如：1.1.1.1 443）
示例：tcping --file D:\abc\1.txt

-v : 显示版本号
示例：tcping -v

# 如果你没有写服务器地址的端口，那么默认为 80 端口
# 其实还有很多命令参数，只是大都用不上，所以省略了
```






---