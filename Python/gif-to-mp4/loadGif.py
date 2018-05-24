# -*- coding: utf-8 -*-

import os
from PIL import Image

png_num = 0

def main(gif_file, png_dir):
    global png_num #global代表引用全局变量,没办法，不写的话，png_num就成局部变量了

    img = Image.open(gif_file)
    try:
        i = 0
        while True:
            current = img.tell()
            # print(current)
            png_num += 1
            # 保存每一帧
            img.save(png_dir+str(current)+'.png')
            img.seek(current+1)

    except:
        pass


if __name__=='__main__':
    gif_file = 'D:/git/zhaoshuxue/document/Python/gif-to-mp4/test.gif'
    gif_file = 'D:/git/oschina/准备发布的/3.gif'
    png_dir = gif_file[:-4] + '/'
    # 创建同名文件夹
    os.mkdir(png_dir)
    main(gif_file, png_dir)
    # 获取gif图片的信息
    img = Image.open(gif_file)
    print(img.info)
    # 获取gif的间隔
    duration = img.info.get('duration')
    print(duration)
    print(png_num)

    total_time = png_num * duration
    print('gif图片持续时长（毫秒）：', total_time)
    total_time = total_time / 1000
    per = png_num / total_time
    print('mp4的帧率：', per)

    cmd = 'D:/ProgramFilesFree/ffmpeg/bin/ffmpeg.exe -f image2 -r ' + str(per) + '  -i %d.png 1111123.mp4'
    # os.system('ffmpeg -f image2 -r 14.285  -i %d.png  ../test12.mp4')
    print(cmd)
    os.chdir(png_dir)
    print(os.getcwd())
    os.system(cmd)
