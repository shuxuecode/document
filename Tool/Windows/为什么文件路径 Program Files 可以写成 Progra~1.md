文件夹（sub-directry)名称，以前是不允许带空白的，后来允许带空白，但由于有了空白，许多命令出现二义性，于是采用双引号括起来的办法。例如：

cd Documents and Settings
按老定义 等于 CD Documents, CD 命令找不到名叫Documents 的 directry

于是采用双引号：
cd “Documents and Settings“

但用到 set PATH 时很麻烦，名字太长，双引号时常括错。于是采用8个字符缩写，即写头六个字母(略去空白），另加波浪号和1。例如：

"Documents and Settings“ --  DOCUME~1
"Local Settings" -- LOCALS~1   （注意略去空白，用了第二个词的字母，凑成六个，再加波浪号和1）。

于是，这种方法成了规定。