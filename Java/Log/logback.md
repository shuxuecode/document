







## 日志输出格式

符号说明：
%d{HH:mm:ss.SSS}：日志输出时间
%-5level：日志级别，并且使用 5 个字符靠左对齐
%thread：输出日志的进程名字，这在 Web 应用以及异步任务处理中很有用
%logger：日志输出者的名字
%msg：日志消息
%n：平台的换行符










## 设置编码

logback输出日志时会取当前运行环境的默认编码，所以中文有时候会产生乱码问题，需要设置指定编码。

```xml
<appender class="">
    <encoder>
        <pattern>必须有该配置</pattern>
        <charset>utf8</charset>
    </encoder>
</appender>
```

