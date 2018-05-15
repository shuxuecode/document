
## 依赖

```

<dependency>
            <groupId>commons-io</groupId>
            <artifactId>commons-io</artifactId>
            <version>2.1</version>
        </dependency>
```

```
<dependency>
            <groupId>commons-codec</groupId>
            <artifactId>commons-codec</artifactId>
            <version>1.11</version>
        </dependency>	
```

## 代码

```
String path = "2.jpg";
            FileInputStream fis= new FileInputStream(path);
            String md5 = DigestUtils.md5Hex(IOUtils.toByteArray(fis));
            IOUtils.closeQuietly(fis);
            System.out.println("MD5:"+md5);

```