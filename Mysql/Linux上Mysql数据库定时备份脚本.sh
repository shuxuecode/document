#!/bin/bash
mysqldump -u用户名 -p密码 --default-character-set=utf8 数据库名称 > /home/backup/warehouse_hainan_$(date +%Y%m%d_%H%M%S).sql
