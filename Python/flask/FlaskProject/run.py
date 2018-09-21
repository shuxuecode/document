#from flask import Flask
from flask import Flask, render_template

app = Flask(__name__)
# 将主程序构建为 Flask应用命名为app　
# 以便于处理用户request 给出response

@app.route("/")
def index():
    return "这是首页　　Hello World!"
    # 配置路由
    # 通过应用装饰器函数来构建视图函数 　视图函数必须有return
    # /表示网站的首页　　根路径


@app.route('/login')
def login():
    return '这是登录页面'

@app.route('/register')
def register():
    return '这是注册页面'


# 定义带一个参数的路由
@app.route('/show1/<name>')
def show1(name):
    return "<h1>姓名为:%s</h1>" % name


# 定义带两个参数的路由  参数可以更多
@app.route('/show2/<name>/<age>')
def show2(name,age):
    return "<h1>姓名为:%s,年龄为:%s" % (name,age)


# 定义带两个参数的路由,其中,age参数指定为整数
@app.route('/show3/<name>/<int:age>')
def show3(name,age):
    # age : 为 整型,并非 字符串
    return "传递进来的参数是name:%s,age:%d" % (name,age)



@app.route('/index')
def index2():
    str = render_template('index.html')
    print(str)
    return str




if __name__ == "__main__":
    app.run(debug=True, port=8888)
# 运行ａｐｐ应用　并开启调试模式　
# 默认端口为5000　自定义端口为8888　　可以省略