-- 通过 * 把user表所有数据查询出来
-- select * from user

-- 从 user 表中把 username 和 password 对应的数据查询出来
-- select username, password from user

-- 向 user 表中，插入新数据，username的值 password的值
-- insert into user (username, password) values ('tom','tom123');

-- 将id为 4 的用户名改为 tony 
-- update user set username='tony',password='tony123' where id=4

-- update user set status=0 where id<2

-- 将id为4的数据删除
-- delete from user where id=4 

-- 演示 where 子句的使用
-- select * from user where status=0
-- select * from user where id>2
-- select * from user where username<>'tom'

-- and
-- select * from user where status=0 and id<3

-- or
-- select * from user where status=0 or id>3

-- roder by  asc 升序    desc 降序  可以不写， 默认是升序
-- select * from user order by username asc
-- select * from user order by password desc 

-- count(*)
-- select count(*) from user where status=1

-- as
select count(*) as total from user where status=1









