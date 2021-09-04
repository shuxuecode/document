## 打包exe执行程序

安装

pip install pyinstaller

执行

pyinstaller -F -w demo.py

参数：

-F 表示打包成一个文件，但启动会很慢
-w 不显示窗口
--icon="tubiao.ico"

| 参数 | 含义 |
| -F | 指定打包后只生成一个exe格式的文件 |
| -D | –onedir 创建一个目录，包含exe文件，但会依赖很多文件（默认选项） |
| -c | –console, –nowindowed 使用控制台，无界面(默认) |
| -w | –windowed, –noconsole 使用窗口，无控制台 |
| -p | 添加搜索路径，让其找到对应的库。 |
| -i | 改变生成程序的icon图标 |


pyinstaller -F -i favicon.ico open_notepad.py --noconsole