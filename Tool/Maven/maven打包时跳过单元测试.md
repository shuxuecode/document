

```XML
<?xml version="1.0" encoding="UTF-8"?>

<build>
	<finalName>monitor</finalName>

	<plugins>
		
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-compiler-plugin</artifactId>
			<version>3.1</version>
			<configuration>
				<source>1.7</source>
				<target>1.7</target>
				<encoding>UTF-8</encoding>
			</configuration>
		</plugin>
		
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-surefire-plugin</artifactId>
			<configuration>
				<skip>true</skip>
				<testFailureIgnore>true</testFailureIgnore>
			</configuration>
		</plugin>
	</plugins>

</build>

```