## 在命令行中查看 JAR 文件中的某个 class 文件内容，实际上可以分为两步：首先是列出 JAR 包中的文件，然后是提取和查看特定的 class 文件

### 查看 JAR 文件中的内容列表：使用 jar 命令或 unzip 命令可以列出 JAR 包中的文件列表。

```
jar tf your-archive.jar
unzip -l your-archive.jar
```


### 查看特定的 class 文件：在命令行中直接查看 class 文件的内容是不太方便的，因为它们是编译过的二进制格式。如果你希望查看 class 文件的源代码或字节码，你需要使用类反编译工具（例如 javap）或者将 class 文件从 JAR 包中解压出来，然后使用反编译器查看。
使用 javap (Java 反编译器) 可以得到字节码的摘要或反编译后的代码。例如：

```
jar xf your-archive.jar path/to/YourClass.class
javap -c -verbose path/to/YourClass
```

这里 your-archive.jar 是 JAR 文件名，path/to/YourClass.class 是你要查看的 class 文件的路径（包括其在 JAR 文件中的包结构）。
-c 选项会输出反汇编的代码，而 -verbose 选项会输出更详细的信息。如果你只是对类结构感兴趣，而不需要看到反汇编的内容，可以去掉 -c 选项。




