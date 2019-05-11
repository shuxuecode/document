
import os
import requests


os.makedirs('D:/1/image/', exist_ok=True)

imgUrls = [
"http://ww2.sinaimg.cn/mw690/b11e11f9jw1f48rllabiqg20c806fdz7.gif",
"http://ww4.sinaimg.cn/bmiddle/9582722cjw1eddcv0hp9yg208w05bk6w.gif",
"http://ww2.sinaimg.cn/mw600/612edf3ajw1edazivu0w1j20c80ci3z9.jpg",
"http://ww3.sinaimg.cn/bmiddle/444d7111jw1ed8ue3vv8tj20go0kpwh9.jpg",
"http://ww2.sinaimg.cn/mw600/444d7111tw1edc2d03fdwg208w06o4qt.gif",
"http://ww2.sinaimg.cn/mw600/612edf3ajw1edb5pcabi3j20bh0cwglz.jpg",
"http://wx1.sinaimg.cn/mw690/b11e11f9ly1frbe2ka0gaj20c80c8dgo.jpg",
"http://ww1.sinaimg.cn/bmiddle/686109f2jw1edemtu0dk3j20by0j8t9h.jpg",
"http://ww2.sinaimg.cn/bmiddle/b54ef65cgw1eddcc5vcc3j209q07o3yo.jpg",
"http://ww1.sinaimg.cn/mw600/444d7111jw1edcbwb8hvng20bg08fx6s.gif",
"http://ww2.sinaimg.cn/mw600/444d7111jw1edazdjobi1g20bh0aqu12.gif",
"http://ww1.sinaimg.cn/bmiddle/685b0aa0jw1edgvjif2tmg209q0574qp.gif",
"http://ww4.sinaimg.cn/bmiddle/61e8a1fdjw1ed7p50r1azj20c80acwfr.jpg",
"http://wx2.sinaimg.cn/mw690/b11e11f9ly1fs0qsbtzs5g20dw099u0x.gif",
"https://wx4.sinaimg.cn/mw690/b003b0edly1fx7png2uvug20b106re25.gif",
"https://ww3.sinaimg.cn/bmiddle/b2325dffgy1fwxd374aujj20j609p74u.jpg",
"http://wx1.sinaimg.cn/mw690/b11e11f9ly1fx6wllm7idg207u04eqv5.gif",
"http://wx1.sinaimg.cn/mw690/b11e11f9ly1fxa61dqmumg206t0544nd.gif",
"http://wx1.sinaimg.cn/mw690/b11e11f9ly1fxeyhzshuxg208w04w1ky.gif",
"https://wx3.sinaimg.cn/mw690/79a00895ly1fxllgzq7oog2080058x6p.gif",
"https://wx2.sinaimg.cn/mw690/79a00895ly1fxecvz8ouwg20b4067dx7.gif",
"https://wx2.sinaimg.cn/mw690/79a00895ly1fwtp1y68nwg20go06yu11.gif",
"https://wx2.sinaimg.cn/mw690/b11e11f9ly1fxrsyafy8ng20b4068kjl.gif",
"https://wx4.sinaimg.cn/mw690/a8d43f7ely1fxtbon4jw5g208w050h03.gif",
"https://wx1.sinaimg.cn/mw690/79a00895ly1fxnwehw6zeg20bo06k4qw.gif",
"https://wx1.sinaimg.cn/mw690/a8d43f7ely1fxou7popr7g20bo06j7wp.gif",
"https://wx2.sinaimg.cn/mw690/9664198fgy1fml16rhdeyg20dc07ijvl.gif",
"https://wx3.sinaimg.cn/mw690/9e6b7fdbly1fvpadluzsug20hs0a0hdt.gif",
"https://wx2.sinaimg.cn/mw690/79a00895ly1fqy9q89qtwg209v05t4qp.gif",
"https://ww1.sinaimg.cn/mw690/c286bebajw1erjetvw8v7g20af05vqv6.gif",
"https://wx1.sinaimg.cn/mw690/79a00895ly1fllh002gzrg20dc07ix6q.gif",
"https://wx4.sinaimg.cn/mw690/006ewLaAly1fqqvc0g8b3g30c807n7ho.gif",
"https://wx1.sinaimg.cn/mw690/c5eeee85ly1fqgy6jyvcrg20a005lb2c.gif",
"https://wx3.sinaimg.cn/mw690/a8d43f7ely1fy0r9aykc5g20ab071npf.gif",
"https://wx4.sinaimg.cn/mw690/006BbUu1ly1fyczwfrjhzg30go09e1la.gif",
"https://wx1.sinaimg.cn/mw690/79a00895ly1fy59o51e4fg20be06dkjs.gif",
"https://wx3.sinaimg.cn/mw690/79a00895ly1fyk9dd6gx1g207s04dhdt.gif",
"https://wx1.sinaimg.cn/mw690/ab53832cly1fmom7wmj96g208w04whdv.gif",
"https://wx1.sinaimg.cn/mw690/c5131475ly1fz47j4abk3j20xy0iqq4h.jpg",
"http://wx1.sinaimg.cn/mw690/b11e11f9ly1fz6lspivpdg20dr064u0z.gif",
"https://wx2.sinaimg.cn/mw690/90b26fd7ly1fyk6f26hoqg20cq06c7wk.gif",
"https://wx1.sinaimg.cn/mw690/006ej71Ogy1fvzvby0pjkg308w050x6p.gif",
"https://wx1.sinaimg.cn/mw690/006CvkgGly1fzeap4rmdrg309q05h4qp.gif",
"https://wx1.sinaimg.cn/mw690/79a00895ly1fzebze3j95g20dc07ikjs.gif",
"https://wx1.sinaimg.cn/mw690/006dAuLSly1fsyprcw5k1g30b4068e86.gif",
"https://wx1.sinaimg.cn/mw690/0069TVnHgy1fzb22wg6t0j30j60ar758.jpg",
"https://wx1.sinaimg.cn/mw690/007hMQQgly1fvc6mv196xg30c806yqv9.gif",
"https://wx1.sinaimg.cn/mw690/79a00895ly1fznk9rksm9g20dc07iqva.gif",
"https://wx3.sinaimg.cn/mw690/006XJfDUly1fkin7vkhzmg308w050tue.gif",
"https://wx2.sinaimg.cn/mw690/79a00895ly1g0781pey5rg209v061u0x.gif",
"https://wx2.sinaimg.cn/mw690/79a00895ly1fzpy3v9d0mg2074040u12.gif",
"https://wx3.sinaimg.cn/mw690/da85a9e3gy1g02bnvqrhqg20go09eb2a.gif",
"https://wx3.sinaimg.cn/mw690/8854705agy1g03zoz8g9ig20b408vkjs.gif",
"https://wx2.sinaimg.cn/mw690/79a00895ly1fzmhc2w8u7g206y03yqv5.gif",
"https://wx1.sinaimg.cn/mw690/8056fe73ly1g04x7k9xu5g20dc07ib2i.gif",
"https://wx2.sinaimg.cn/mw690/7cc829d3ly1g1mz0wuvlpg208w053qv5.gif",
"https://wx4.sinaimg.cn/mw690/6e7905a7gy1g1fxvzadzfg20fs08wu14.gif"
]

# for url in imgUrls:
    # print(random.choice('abcdefghijklmnopqrstuvwxyz'))
    # print(''.join(random.sample('zyxwvutsrqponmlkjihgfedcba',10)))

for url in imgUrls:
    r = requests.get(url)
    print(url)
    index = url.rfind('/')
    fileName = url[index+1:]
    # fileName = url[-20,]
    # fileName = ''.join(random.sample('zyxwvutsrqponmlkjihgfedcba',10))
    print(fileName)

    with open('D:/1/image/'+fileName, 'wb') as f:
        f.write(r.content)





#
