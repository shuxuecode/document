import datetime

str = '2023-08-08 22:45:25+08:00'
str = str[0:-6]
print(str)

# a = datetime.strptime('2020-01-01 12:12:12', '%Y-%m-%d %H:%M:%S')
a = datetime.datetime.strptime(str, '%Y-%m-%d %H:%M:%S')

print(type(a))
print(a)

now = datetime.datetime.now()

print(type(now))
print(now)

b = now - datetime.timedelta(minutes=10)

print(b)

print(a > b)