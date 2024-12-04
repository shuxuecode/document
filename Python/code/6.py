
from datetime import datetime
import calendar

# 输入日期字符串
date_str = "2024-11-29"

# 将字符串转换为日期对象
date_obj = datetime.strptime(date_str, "%Y-%m-%d")

# 获取月份和日期
month = date_obj.month
day = date_obj.day

# 获取星期几，日期对象的 weekday 方法返回的数字是从周一开始的（0），所以需要转换
weekday_index = date_obj.weekday()
# 将数字转换为中文星期
weekday_cn = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
weekday_str = weekday_cn[weekday_index]

# 格式化输出结果
result = f"{month}月{day}号 {weekday_str}"

print(result)

