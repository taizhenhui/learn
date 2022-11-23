const mysql = require('mysql')

const db = mysql.createPool({
  host:'127.0.0.1',
  user:'root',
  password:'admin123',
  database:'my_db_01'
})

// // 测试 mysql 模块能否正常工作
// db.query('select 1',(err, res) => {
//   if(err) return console.log(err.message)
//   console.log(res);
// })


// let userAll = 'select * from user'
// db.query(userAll,(err, res) => {
//   if(err) return console.log(err.message)
//   console.log(res);
// })

/*
 * @ 插入数据
 */ 
// let user = {name:'man',password:'man123'}
// let insertInto = 'insert into user (username, password) values (?, ?) '
// db.query(insertInto,[user.name, user.password], (err, res) => {
//   if(err) return console.log(err.message)
//   if(res.affectedRows === 1) console.log('插入数据成功')
// })

/*
 * @ 插入数据 简化方式  
 */ 
// let user = {username:'tai',password:'tai123'}
// let insertInto = 'insert into user set ?'
// db.query(insertInto, user, (err, res) => {
//   if(err) return console.log(err.message)
//   if(res.affectedRows === 1) console.log('插入数据成功')
// })

/*
 * @ 更新数据
 */ 
// let user = {username:'tea',password:'tea123', id: 7}
// let updateSet = 'update user set username=?, password=? where id=?'
// db.query(updateSet,[user.username,user.password,user.id],(err, res)=>{
//   if(err) return console.log(err.message)
//   if(res.affectedRows === 1) console.log('修改数据成功')
// })

/*
 * @ 更新数据 简化方式  
 */ 
// let user = {username:'egg',password:'egg123', id: 8}
// let updateSet = 'update user set ? where id=?'
// db.query(updateSet, [user, user.id], (err, res) => {
//   if(err) return console.log(err.message)
//   if(res.affectedRows === 1) console.log('修改数据成功')
// })

/*
 * @ 删除数据 
 */ 
// let deleteSql = 'delete from user where id=?'
// db.query(deleteSql,7, (err, res) => {
//   if(err) return console.log(err.message)
//   if(res.affectedRows === 1) console.log('删除数据成功')
// })

/*
 * @ 标记删除 
 */ 
// let deleteSql = 'update user set status=? where id=?'
// db.query(deleteSql,[0, 6], (err, res) => {
//   if(err) return console.log(err.message)
//   if(res.affectedRows === 1) console.log('标记删除数据成功')
// })