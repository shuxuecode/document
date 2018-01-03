## atom中print中文乱码

方案一：

直接在脚本下加入语句 sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding='utf8')

方案二：

添加系统变量 PYTHONIOENCODING=UTF8

添加完记得重启atom