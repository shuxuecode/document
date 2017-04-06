## 1、安装zookeeper

## 2、创建一个公共的接口服务



		<plugins>
			<plugin>
				<artifactId>maven-assembly-plugin</artifactId>
				<configuration>
					<!--这部分可有可无,加上的话则直接生成可运行jar包 -->
					<!--<archive> -->
					<!--<manifest> -->
					<!--<mainClass>${exec.mainClass}</mainClass> -->
					<!--</manifest> -->
					<!--</archive> -->
					<descriptorRefs>
						<descriptorRef>jar-with-dependencies</descriptorRef>
					</descriptorRefs>
				</configuration>
			</plugin>
		</plugins>
		