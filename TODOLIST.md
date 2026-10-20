

conductor编排

todo list

ai agent

rag

gen




---

### Web Clipper 开源网页剪藏插件

Web Clipper 是一个适用于 Notion、OneNote、Joplin、Yuque、Bear、Github 的通用开源网页剪藏插件。

#### 介绍
Web Clipper 是一款开源的剪藏插件，可实现书签保存、全文剪藏、选定内容剪藏等功能。

#### 特点
功能：提供了书签、整个页面、智能提取、手动选取等四个剪藏扩展。
价格：开源、免费
服务：目前已经支持包括 FlowUs 在内的十几款效率工具。
操作平台：支持 Chrome、Edge、Firefox 等在内的主流浏览器。
插件安装方法：在浏览器插件市场检索 Web Clipper.或者前往 Web Clipper Github 官网查看安装包和部署方案。
插件使用方法：安装插件——绑定笔记软件账户——选择剪藏内容所要存放的空间/知识库——确认。






---

使用 DNS-01 验证的底层逻辑是：证书签发机构（CA）给你一串随机的字符串（Token），你把它作为 TXT 记录写到域名的 DNS 解析里，CA 检测到这个记录，就证明域名确实属于你。 [1] (/goto?url=CAESZQHrOzAVFa3QoJBstoGV0fUTAt0hFWMwDbvSRUcP-EikBvPVxnr6hmhaxuad8F8MS2R4t7y2Mu-yAkio1x6VjrpGUBOiHGjIJkdYGDZLqgeZa8vCDWDmWP3WvU9aKMNIgXEfXJu-)
为了实现全自动续期，最流行、最好用的工具是 acme.sh（一个轻量级的纯 Shell 脚本工具）。它内置了全球 150 多家 DNS 服务商（如阿里云、腾讯云、Cloudflare、华为云等）的 API 接口，可以实现：自动创建 TXT 记录 ➡️ 验证成功 ➡️ 自动删除 TXT 记录 ➡️ 以后每 60 天自动重复此过程。 [1] (/goto?url=CAESfwHrOzAVY9Il_WJ8RDvS4mKdBODLIASEYLO_Gcbi1aV-7Y-EfKaIaFlNwhOKMym1ogkh2NxB8Xr5_8HJJJicpNjUg9OE89dCQg-OGadG2Wt9PWDpSyzVVeTzzD-s0P0MiTzRfEY09-rNnw6ua33FoLvj_XsW3bgFaA41ExkcKbQ), [2] (/goto?url=CAESYwHrOzAV51d7XRhpD9txez88rocjp6DXPOizU1oCOrcBmxZs4FC7gxMYCFs2zzsB4z3wsuGMHyTfqJEelCGhO3dctut6m8oKhFtCeS4MS2lE-sibdKyjxdYIhijGiptmEFqXzg), [3] (/goto?url=CAEScwHrOzAVFreNOKerWsFmz2mHXSIkIz3zsfjAWQhdbj8zzmUksOvcPKiD0e2_hBBl7kK52yd7nLuGrIOV8j2ueaUs6isFIMueKNEBAX9anzuly5iSgpZjnmFdgyuz1FoO7kKvAGJpo4E9tAnPa0mY2KFyKDk)
以下是在 Linux 服务器（以 Ubuntu/CentOS 为例）上配置 DNS-01 全自动验证的详细图文级教程：

第一步：安装 acme.sh 客户端

登录你的服务器，运行以下命令（将 my@example.com 换成你自己的真实邮箱，用于接收证书过期提醒）：
bash
curl https://acme.sh | sh -s email=my@example.com
请谨慎使用此类代码。
注意： 安装完成后，请关闭当前终端并重新连接，或者运行 source ~/.bashrc 以激活 acme.sh 命令。

第二步：获取并配置你的 DNS 提供商 API 密钥

acme.sh 需要通过 API 自动去修改你的域名解析。你需要登录你购买域名（或托管 DNS）的平台，生成一组 API 密钥。 [1] (/goto?url=CAESXAHrOzAVyAopMBmTgTUKQo_XoHk5KAKiUKg8Gwqv4hTZhlEMVcSfPW2cBBr2YnJ81bZTAE4O1RPX8_ae8JL7-oXlcV9iwBzWtk6XQhrENa-VTGVpBVpooLtxKkFy), [2] (/goto?url=CAESZQHrOzAVFa3QoJBstoGV0fUTAt0hFWMwDbvSRUcP-EikBvPVxnr6hmhaxuad8F8MS2R4t7y2Mu-yAkio1x6VjrpGUBOiHGjIJkdYGDZLqgeZa8vCDWDmWP3WvU9aKMNIgXEfXJu-), [3] (/goto?url=CAESYwHrOzAV51d7XRhpD9txez88rocjp6DXPOizU1oCOrcBmxZs4FC7gxMYCFs2zzsB4z3wsuGMHyTfqJEelCGhO3dctut6m8oKhFtCeS4MS2lE-sibdKyjxdYIhijGiptmEFqXzg)
根据你使用的平台，选择以下对应的配置（在终端中直接运行对应的 export 命令）：

选项 A：如果你的域名在 阿里云 (Alibaba Cloud)

1. 登录阿里云控制台，访问 RAM 访问控制。
2. 创建一个用户（勾选“OpenAPI 调用访问”），并授予 AliyunDNSFullAccess（管理云解析DNS的权限）。
3. 复制生成的 AccessKey ID 和 AccessKey Secret，在服务器终端执行：bash
export Ali_Key="你的AccessKeyID"
export Ali_Secret="你的AccessKeySecret"
请谨慎使用此类代码。

选项 B：如果你的域名在 腾讯云 (Tencent Cloud / DNSPod)

1. 登录腾讯云控制台，访问 API 密钥管理。
2. 新建密钥，复制 SecretId 和 SecretKey，在服务器终端执行：bash
export TENCENT_SECRET_ID="你的SecretId"
export TENCENT_SECRET_KEY="你的SecretKey"
请谨慎使用此类代码。

选项 C：如果你的域名在 Cloudflare

1. 登录 Cloudflare，点击右上角头像 ➡️ My Profile ➡️ API Tokens ➡️ Create Token。
2. 使用 Edit zone DNS 模板，创建一个允许修改你域名 DNS 的 Token。
3. 复制 Token，在服务器终端执行： [1] (/goto?url=CAEScAHrOzAVwNng_yy4ZXqmkbKoo46L0VxG8R_cR4Ee1qTVmG_GGLxc6ienqeIUT3qBGFVlpyyW8yKmf1hQ1l5cpuX1ntTNyx53EdPrzF9vvDR4dyIj-Q2K68SRhke3UBD50SGhx1pGRaxaSjFpslACOr4)
bash
export CF_Token="你的Cloudflare_API_Token"
请谨慎使用此类代码。
(注：其他 DNS 厂商如华为云 dns_huaweicloud、Porkbun 等，acme.sh 官方文档 均有对应变量名)。 [1] (/goto?url=CAESYwHrOzAV51d7XRhpD9txez88rocjp6DXPOizU1oCOrcBmxZs4FC7gxMYCFs2zzsB4z3wsuGMHyTfqJEelCGhO3dctut6m8oKhFtCeS4MS2lE-sibdKyjxdYIhijGiptmEFqXzg), [2] (/goto?url=CAESXAHrOzAVyAopMBmTgTUKQo_XoHk5KAKiUKg8Gwqv4hTZhlEMVcSfPW2cBBr2YnJ81bZTAE4O1RPX8_ae8JL7-oXlcV9iwBzWtk6XQhrENa-VTGVpBVpooLtxKkFy)

第三步：一键申请证书（支持泛域名）

DNS-01 验证最大的优势是支持泛域名证书（通配符证书），即申请一个证书，可以同时保护 yourdomain.com 和所有二级域名（如 blog.yourdomain.com、api.yourdomain.com）。 [1] (/goto?url=CAEScwHrOzAVFreNOKerWsFmz2mHXSIkIz3zsfjAWQhdbj8zzmUksOvcPKiD0e2_hBBl7kK52yd7nLuGrIOV8j2ueaUs6isFIMueKNEBAX9anzuly5iSgpZjnmFdgyuz1FoO7kKvAGJpo4E9tAnPa0mY2KFyKDk), [2] (/goto?url=CAESowEB6zswFU4LfhO_kUzVmvl8nl-o6kqoeDhPf-g8sxSyt9Zi_YsAkWjI4M00SODLPNi3qKvqS1_rPTIAChRf4rBSjFPiZjseVtiLp9UYDGwnlQjQ_hJ_afHi56fSJHwyLuuMizHVYzN5CkPzNfDXtzj38rkL-DB4wVn5MjKOCfJosCf-Q8dWaa4VGRRfc5wZ5VERxtd97FSxK6v9s3DqWnZblvVM)
在终端运行以下签发命令（请根据你的服务商修改 --dns 参数）：
bash
# 如果是阿里云 (dns_ali)
acme.sh --issue --dns dns_ali -d yourdomain.com -d *.yourdomain.com

# 如果是腾讯云 (dns_tencent)
acme.sh --issue --dns dns_tencent -d yourdomain.com -d *.yourdomain.com

# 如果是 Cloudflare (dns_cf)
acme.sh --issue --dns dns_cf -d yourdomain.com -d *.yourdomain.com
请谨慎使用此类代码。
执行后，脚本会自动：
1. 向 Let's Encrypt 申请证书。
2. 调用 API 在你的域名下创建 _acme-challenge.yourdomain.com 的 TXT 记录。
3. 自动等待几十秒（等待 DNS 生效并在全球同步）。
4. CA 机构检测成功，下发证书文件。
5. 自动删除刚才创建的临时 TXT 记录。 [1] (/goto?url=CAESdAHrOzAV-bjj-qEno8IZKwteHbq6C6AaH87k_wq2OIMT1x9pNTV9ylTy_9kggFU-He4rG8aBT3HjejT-AlqFYi6wzjto46W4csXcK0msj933WVC7XuT_fnUlAcHWzORNcIllyg9NEMdd-vWXZABJBsger12z), [2] (/goto?url=CAEScwHrOzAVFreNOKerWsFmz2mHXSIkIz3zsfjAWQhdbj8zzmUksOvcPKiD0e2_hBBl7kK52yd7nLuGrIOV8j2ueaUs6isFIMueKNEBAX9anzuly5iSgpZjnmFdgyuz1FoO7kKvAGJpo4E9tAnPa0mY2KFyKDk), [3] (/goto?url=CAESZQHrOzAVFa3QoJBstoGV0fUTAt0hFWMwDbvSRUcP-EikBvPVxnr6hmhaxuad8F8MS2R4t7y2Mu-yAkio1x6VjrpGUBOiHGjIJkdYGDZLqgeZa8vCDWDmWP3WvU9aKMNIgXEfXJu-), [4] (/goto?url=CAESYwHrOzAV51d7XRhpD9txez88rocjp6DXPOizU1oCOrcBmxZs4FC7gxMYCFs2zzsB4z3wsuGMHyTfqJEelCGhO3dctut6m8oKhFtCeS4MS2lE-sibdKyjxdYIhijGiptmEFqXzg)

第四步：将证书安装/复制到 Web 服务器 (Nginx/Apache)

【极其重要】 请不要直接把 ~/.acme.sh/ 目录下的证书直接配置到 Nginx 中。正确做法是使用 --install-cert 命令将证书复制到指定的生产目录，并设置自动重启 Web 服务：
以 Nginx 为例，先在服务器创建存证书的目录（如 /etc/nginx/ssl/），然后运行：
bash
acme.sh --install-cert -d yourdomain.com \
--key-file       /etc/nginx/ssl/yourdomain.key  \
--fullchain-file /etc/nginx/ssl/fullchain.cer \
--reloadcmd     "systemctl force-reload nginx"
请谨慎使用此类代码。
--reloadcmd 的作用： 以后每次证书自动续期成功后，acme.sh 会自动运行这个命令重启 Nginx，使新证书立即生效，完全不需要人工干预。

第五步：在 Nginx 中引用证书

修改你的 Nginx 配置文件（如 nginx.conf），将 SSL 证书路径指向刚刚复制出来的路径：
nginx
server {
    listen 443 ssl;
    server_name yourdomain.com *.yourdomain.com;

    ssl_certificate /etc/nginx/ssl/fullchain.cer;
    ssl_certificate_key /etc/nginx/ssl/yourdomain.key;

    # 其他 Nginx 配置...
}
请谨慎使用此类代码。
保存并重启 Nginx，你的全自动加密网站就部署完成了！

验证与日常维护

• 它怎么自动续期？
在安装 acme.sh 时，它已经在你的服务器中自动创建了一个 Crontab 定时任务。每天它都会在后台悄悄检查证书，当发现证书还剩 30 天以内过期时，就会自动通过 DNS-01 接口更新证书并重启 Nginx。
• 如何查看当前管理的证书列表？bash
acme.sh --list
请谨慎使用此类代码。
• 如何手动强制续期（测试排错时使用）？ [1] (/goto?url=CAESggEB6zswFWwSd8K5n_Q7lngpgybsV4YJM-ob85DRaLwQUB_Fo8z8zv0j7tPSUfEJwb6g_0sMEFaNvxZgstg3OgczHPF_CrOzvWb_qB1q9-KuIl7RIgFZuDMHYD4a5tYp0sfwFwn1BB4eptSHX-AoXad6CpyscMjRalFJnv3paB2BlHPX), [2] (/goto?url=CAEScwHrOzAVFreNOKerWsFmz2mHXSIkIz3zsfjAWQhdbj8zzmUksOvcPKiD0e2_hBBl7kK52yd7nLuGrIOV8j2ueaUs6isFIMueKNEBAX9anzuly5iSgpZjnmFdgyuz1FoO7kKvAGJpo4E9tAnPa0mY2KFyKDk)
bash
acme.sh --renew -d yourdomain.com --force
请谨慎使用此类代码。
如果在配置过程中，遇到了形如 "Can not access DNS API" 或者 "Timeout" 的报错，可以把报错信息发给我，我来帮你排查是 API 权限没给对 还是 DNS 平台没有开启特定开关！


