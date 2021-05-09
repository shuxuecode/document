# crontab文件位置和日志位置

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


