# -*- coding: utf-8 -*-

# 以下是接收邮件的库
import imaplib
import smtplib
import subprocess
from email.mime.text import MIMEText

# 第三方 SMTP 服务
mail_host="smtp.163.com"  #设置服务器
# 发送方信息
mail_user="test@163.com"    #用户名
mail_pass=""   #口令

# 收件人列表
mail_namelist = ["test@qq.com"]

#发送邮件
#title：标题
#conen：内容
def send_qq_email(title,conen):
    try:
        msg = MIMEText(str(conen))
        #设置标题
        msg["Subject"] = title
        # 发件邮箱
        msg["From"] = mail_user
        #收件邮箱
        msg["To"] = ";".join(mail_namelist)
        # 设置服务器、端口
        s = smtplib.SMTP_SSL(mail_host, 465)
        #登录邮箱
        s.login(mail_user, mail_pass)
        # 发送邮件
        s.sendmail(mail_user, mail_namelist, msg.as_string())
        s.quit()
        print("邮件发送成功!")
        return True
    except smtplib.SMTPException:
        print("邮件发送失败！")
        return False


def checkMonitor():
    res = subprocess.Popen("ps -ef | grep qdp-monitor",stdout=subprocess.PIPE,shell=True)
    tomcats=res.stdout.readlines()
    counts=len(tomcats)
    if counts<2:
        send_qq_email("监控系统服务异常","检测不到监控系统进程")
    else:
        print("进程存在")


def pullMail():
    conn = imaplib.IMAP4_SSL(port = '993',host = 'imap.163.com')
    print('已连接服务器')
    conn.login('test@163.com','')
    print('已登陆')
    conn.select()

    type, data = conn.search(None, 'ALL')
    print(type)
    print(data)



# checkMonitor()
# send_qq_email("监控系统服务异常","检测不到监控系统进程")
pullMail()


# 0 */1 * * * python /data/Application/monitor/monitorSendMail.py



#
