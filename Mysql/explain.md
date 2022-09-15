
## explain

> 作用：
> 分析sql如何使用索引
> 联接查询的执行顺序
> 查询扫描的数据行数

### id
表示执行select语句的顺序
- id值相同时，执行顺序由上至下
- id值越大优先级越高，越先被执行


### select_type

| 值 | 说明 |
| - | - |
| SIMPLE | 不包含子查询或是UNION操作的查询 |
| primary | 查询中如果包含任何子查询，那么最外层的查询则被标记为primary |
| subquery | select列表中的子查询 |
| dependent subquery | 依赖外部结果的子查询 |

### table
输出数据行所在的表的名称


### partitions
对于分区表，显示查询的分区id对于非分区表，显示为null

### type



### extra


### possible_key



### key



### key_len


### ref






