
## 依赖冲突检查

mvn -U dependency:tree



## 命令行创建maven项目



linux 

vim /etc/profile

export MAVEN_HOME=/apache-maven-3.6.3
export PATH=$PATH:$MAVEN_HOME/bin



mvn archetype:generate -DgroupId=com -DartifactId=zsx -DarchetypeArtifactId=maven-archetype-webapp -DarchetypeCatalog=internal


mvn archetype:generate -DgroupId=com.zsx -DartifactId=springBootWeb -DarchetypeArtifactId=maven-archetype-webapp -DarchetypeCatalog=internal

mvn archetype:generate -DgroupId=com -DartifactId=springBoot1.5.9 -DarchetypeArtifactId=maven-archetype-webapp -DarchetypeCatalog=internal


---