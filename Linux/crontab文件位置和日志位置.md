## crontab格式
```
f1 f2 f3 f4 f5 program
# 分(0-59) 时(0-23) 日(1-31) 月(1-12) 周(0-6) 程序
```

## 命令

crontab -l # 查看定时任务
crontab -e # 编辑定时任务
crontab -r # 删除定时任务


*/30 * * * * /usr/shell.sh >> /logs/tmp.log

表示每30分钟执行一次，>> 表示追加输出到tmp.log文件，> 表示覆盖输出到log文件





## crontab文件位置和日志位置

文件位置

/var/spool/cron/

日志文件位置

/var/log

#ls /var/log/cron*





## Ubuntu查看crontab运行日志

默认日志文件在 `/var/log/cron.log`

如果没有，需要开启，执行下面操作

1. 修改rsyslog

sudo vim /etc/rsyslog.d/50-default.conf

cron.*   /var/log/cron.log #将cron前面的注释符去掉 

2. 重启rsyslog

sudo  service rsyslog  restart

3. 重启cron
sudo service cron restart

4. 查看crontab日志

tail -f /var/log/cron.log 


