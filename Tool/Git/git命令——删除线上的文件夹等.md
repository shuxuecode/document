git 

$ git rm --cached ".settings/*"
rm 'spring-boot-registry/.settings/.jsdtscope'
rm 'spring-boot-registry/.settings/org.eclipse.core.resources.prefs'
rm 'spring-boot-registry/.settings/org.eclipse.jdt.core.prefs'
rm 'spring-boot-registry/.settings/org.eclipse.m2e.core.prefs'
rm 'spring-boot-registry/.settings/org.eclipse.wst.common.component'
rm 'spring-boot-registry/.settings/org.eclipse.wst.common.project.facet.core.prefs.xml'



提交即可


## 

对于不小心提交了没用的文件后，

执行  git rm --cached springBootWeb.iml  删除文件

执行  git rm -r --cached target/  删除文件夹

git add .
git commit -m 'delete'
git push