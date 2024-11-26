




## 获取issue列表

```JS

repo.issues.fetch({
  state: 'all',     // 拉取什么状态的issue，可以设置为 'open' 或 'closed' 或 'all'
  per_page: 5,      // 每页的 issue 数量
  sort: 'created',  // 按创建时间排序
  direction: 'desc' // 按降序排序
})
.then(res => {
  console.log('res : ', JSON.stringify(res));
})
.catch(error => {
  console.error('Error fetching issues: ', error);
});

```


## 更新issue
```JS
repo.issues(issueNumber).update({
  title: 'New issue title',
  body: 'New issue body',
  state: 'open'
})
.then(res => {
  console.log('res update : ', JSON.stringify(res));
})
.catch(error => {
  console.error('Error update issues: ', error);
});

```
