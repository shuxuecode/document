

## 查看docker日志

Docker默认把所有的日志存在一个log文件里面。通过以下命令查看docker对应log的地址:
```bash
docker inspect --format='{{.LogPath}}' [containername]
```


如果想要在命令行下看到实时的日志，使用以下命令:

```bash
tail -f `docker inspect --format='{{.LogPath}}' [containername]`
```

