xShell连接Linux服务器提示密码错误。 
1、检查虚拟机SSH服务是否开启： 
service sshd status，如果没有开启，请执行service sshd start启动该服务，或者通过service sshd restart重启该服务；

2、检查 /etc/ssh/ssh_config文件： 
ssh服务端口是否为22，Protocol协议版本是否为2（一般为2安全。1为ssh 1不安全，有可能禁止登陆）； 
3、检查/etc/ssh/sshd_config： 
将

    # Authentication:
    LoginGraceTime 120
    PermitRootLogin without passwd
    StrictModes yes

改成
    # Authentication:
    LoginGraceTime 120
    PermitRootLogin yes
    StrictModes yes

或者
当SSH配置被注释掉时，将注释释放就可以。
重启虚拟机。