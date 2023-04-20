# MYSQL



## 管理库



### 创建库

```sql
CREATE DATABASE `库的名称`;
```



### 删除库

```sql
DROP DATABASE `库的名称`;
```



### 切换当前库

```sql
USE `库的名称`;
```





## 管理表



### 创建表

##### 字段

- 字段名
- 字段类型
  - `bit`：占1位，0或1，false或true
  - `int`：占32位，整数
  - `decimal(M, N)`：能精确计算的实数，M是总的数字位数，N是小数位数
  - `char(n)`：固定长度位n的字符
  - `varchar(n)`：长度可变，最大长度位n的字符
  - `text`：大量的字符
  - `date`：仅日期
  - `datetime`：日期和时间
  - `time`：仅时间
- 自增
- 默认值



> **例**：
>
> ```sql
> CREATE TABLE `test`.`students`  (     在test库中 创建 students 表
>   `id` int NOT NULL AUTO_INCREMENT,		id int类型 不能为空 自增
>   `name` varchar(255) NOT NULL,				name varchar类型 不能为空
>   `birthday` date NOT NULL,						birthday date类型 不能为空
>   PRIMARY KEY (`id`)									主键 为 id
> );
> ```
>
> 



### 删除表

```sql
DROP TABLE test.`student`; 删除test库下 student 表
```







## sql语句