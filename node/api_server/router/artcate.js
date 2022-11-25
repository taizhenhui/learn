const express = require('express')
const expressJoi = require('@escook/express-joi')
const artcate_handler = require('../router_handler/artcate')
const {add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema} = require('../schema/artcate')
const router = express.Router()

// 获取数据列表
router.get('/cates', artcate_handler.getArticleCates)
// 添加文章
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates)
// 删除文章
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCateById)
// 获取文章数据
router.get('/cates/:id', expressJoi(get_cate_schema), artcate_handler.getArtCateById )
// 更新文章数据
router.post('/updatecate', expressJoi(update_cate_schema), artcate_handler.updateCateById)


module.exports = router