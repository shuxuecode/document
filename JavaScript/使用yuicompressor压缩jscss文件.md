
在命令行中 输入  java -jar yuicompressor-2.4.2.jar --help 会有提示信息

```
-h, --help Displays this information  帮助信息
--type <js|css> Specifies the type of the input file  压缩类型
--charset <charset> Read the input file using <charset>   文件使用的字符集编码
--line-break <column> Insert a line break after the specified column number   在一个指定的列数之后插入一个换行（一般是不需要的）
-v, --verbose Display informational messages and warnings   显示详细信息和警告信息
-o <file> Place the output into <file>. Defaults to stdout.      输出文件，默认为标准输出

JavaScript Options  JS特有选项
--nomunge Minify only, do not obfuscate   仅压缩，不混淆
--preserve-semi Preserve all semicolons     保留所有的分号
--disable-optimizations Disable all micro optimizations  禁用自带的所有优化措施
```



java -jar yuicompressor-2.4.8.jar --type js --charset utf-8 --disable-optimizations -v 原文件.js > 压缩.min.js







#