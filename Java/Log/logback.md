


















## 设置编码

logback输出日志时会取当前运行环境的默认编码，所以中文有时候会产生乱码问题，需要设置指定编码。

```
<appender class="">
    <encoder>
        <pattern>必须有该配置</pattern>
        <charset>utf8</charset>
    </encoder>
</appender>
```
