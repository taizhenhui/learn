const express = require('express')
const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema,update_password_schema } = require('../schema/user')
const userinfoHandler = require('../router_handler/userinfo')

const router = express.Router()

router.get('/userinfo', userinfoHandler.getUserInfo)
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfoHandler.updateUserInfo)
router.post('/updatepwd', expressJoi(update_password_schema), userinfoHandler.updatePassword)


module.exports = router