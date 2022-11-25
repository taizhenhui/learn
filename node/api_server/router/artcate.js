const express = require('express')
const expressJoi = require('@escook/express-joi')
const artcate_handler = require('../router_handler/artcate')
const {add_cate_schema, delete_cate_schema} = require('../schema/artcate')
const router = express.Router()


router.get('/cates', artcate_handler.getArticleCates)
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates)
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCateById)



module.exports = router