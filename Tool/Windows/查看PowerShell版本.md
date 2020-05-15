

PS C:\Users\zsx> $PSVersionTable

Name                           Value
----                           -----
PSVersion                      5.1.17134.765
PSEdition                      Desktop
PSCompatibleVersions           {1.0, 2.0, 3.0, 4.0...}
BuildVersion                   10.0.17134.765
CLRVersion                     4.0.30319.42000
WSManStackVersion              3.0
PSRemotingProtocolVersion      2.3
SerializationVersion           1.1.0.1


# windows Terminal 添加 git-bash

在设置里添加如下：

```
{
    "guid": "{b453ae62-4e3d-5e58-b989-0a998ec441b7}",
    "hidden": false,
    "name": "git bash",
    "icon": "D:\\Git\\icon.jpg",
    "commandline": "D:\\Git\\bin\\bash.exe --login -i"
}
```

> 要使用ll这个命令的话，需要在bash.exe 后面添加` --login -i`，即可。