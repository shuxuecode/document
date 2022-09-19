
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
| 性能 | 值 | 含义 |
| - | - | - |
| 高 | system | 这是const连接类型的一个特例，当查询的表只有一行时使用 |
|  | const | 表中有且只有一个匹配的行时使用，如对主键或是唯一索引的查询，这是效率最高的连接方式 |
|  | eq_ref | 唯一索引或者主键索引查找，对于每个索引键，表中只有一条记录与之匹配 |
|  | ref | 非唯一索引查找，返回匹配某个单独值所有行 |
|  | ref_or_null | 类型于ref类型的查询，但是附加了对null值列的查询 |
|  | index_merge | 该连接类型表示使用了索引合并优化方式 |
|  | range | 索引范围扫描，常见于between，>，<这样的查询条件 |
|  | index | FULL index scan全索引扫描，同all的区别是，遍历的事索引树 |
| 低 | all | full table scan全表扫描，效率最差 |



### extra
|  值 | 含义 |
|  - | - |
| distanct | 优化distinct操作，在找到第一匹配的元组后即停止找同样值的动作 |
| not exists | 使用not exists来优化查询 |
| using filesort | 使用额外操作进行排序，通常会出现在order by 或者 group by查询中 |
| using index | 使用了覆盖索引进行查询 |
| using temporary | MySQL需要使用临时表来处理查询，常见于排序、子查询和分组查询 |
| using where | 需要在MySQL服务器层使用where条件来过滤数据 |
| select tables optimized away | 直接通过索引来获得数据，不用访问表 |


### possible_key
指出MySQL能使用哪些索引来优化查询，不一定会被使用



### key
查询优化器 优化查询实际所使用的索引，如果没有可用的索引，则显示为null


### key_len
表示索引字段的最大可能长度，key_len的长度由字段定义计算而来，并非数据的实际长度。


### ref
表示那些列或常量被用于查找索引列上的值

### rows
表示MySQL通过索引统计信息，估算的所需读取的行数，rows的大小是个统计抽样结果，并不十分准确。


### Filtered
表示返回结果的行数占需读取行数的百分比，Filtered列的值越大越好，Filtered列的值依赖于统计信息。





