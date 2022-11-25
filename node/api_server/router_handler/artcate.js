const db = require('../db/index')

exports.getArticleCates = (req, res) => {
  const sql = `select * from ev_article_cate where is_delete=0 order by id asc`
  db.query(sql, req.user.id , (err, results) => {
    if(err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取文章分类列表成功！',
      data: results
    })
  })
}

exports.addArticleCates = (req, res) => {
  // 查询 分类名称 与 分类别名 是否被占用的 SQL 语句
  const { body: {name, alias}, user:{id} } = req
  const sql = `select * from ev_article_cate where name=? or alias=?`
  db.query(sql, [name, alias], (err, results) => {
    if(err) return res.cc(err)
    if(results.length === 1 && name === results[0].name && alias === results[0].alias) return res.cc('分类名称与别名被占用，请更换后重试！')
    if(results.length === 1 && name === results[0].name) return res.cc('分类名称 被占用，请更换后重试！')
    if(results.length === 1 && alias === results[0].alias) return res.cc('分类别名 被占用，请更换后重试！')
    const addSql = `insert into ev_article_cate set ?`
    db.query(addSql, req.body, (err, results) => {
      if(err) return res.cc(err)
      if(results.affectedRows !== 1) return res.cc('新增文章分类失败！')
      res.cc('新增文章分类成功！', 0)
    })
  })
}

exports.deleteCateById = (req, res) => {
  const sql = `update ev_article_cate set is_delete=1 where id=?`
  db.query(sql, req.params.id, (err, results) => {
    if(err) return res.cc(err)
    console.log(results,'results');
    if(results.affectedRows !== 1) return res.cc('删除文章分类失败！')
    res.cc('删除文章分类成功！', 0)
  })
}

exports.getArtCateById = (req, res) => {
  const sql = `select * from ev_article_cate where id=?`
  db.query(sql, req.params.id, (err, results) => {
    if(err) return res.cc(err)
    if(results.length !== 1) return  res.cc('获取文章分类数据失败！')
    res.send({
      status: 0,
      message: '获取文章分类数据成功！',
      data: results[0],
    })
  })
}

exports.updateCateById = (req, res) => {
  let {id, name, alias} = req.body
  const sql = `select * from ev_article_cate where id<>? and (name=? or alias=?)`
  db.query(sql, [id, name, alias], (err, results) => {
    console.log(results,'results');
    if(err) return res.cc(err)
    if(results.length === 1 && name === results[0].name && alias === results[0].alias) return res.cc('分类名称与别名被占用，请更换后重试！')
    if(results.length === 1 && name === results[0].name) return res.cc('分类名称 被占用，请更换后重试！')
    if(results.length === 1 && alias === results[0].alias) return res.cc('分类别名 被占用，请更换后重试！')
    const updateSql = `update ev_article_cate set ? where id=?`
    db.query(updateSql, [req.body, id], (err, results) => {
      if(err) return res.cc(err)
      if(results.affectedRows !== 1) return res.cc('更新文章分类失败！')
      res.cc('更新文章分类成功！', 0)
    })
  })
}