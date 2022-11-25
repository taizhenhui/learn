const express = require('express')
const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema,update_password_schema, update_avatar_schema } = require('../schema/user')
const userinfoHandler = require('../router_handler/userinfo')

const router = express.Router()

// 获取用户信息
router.get('/userinfo', userinfoHandler.getUserInfo)
// 修改用户信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfoHandler.updateUserInfo)
// 重置密码
router.post('/updatepwd', expressJoi(update_password_schema), userinfoHandler.updatePassword)
// 更新头像
router.post('/update/avatar',expressJoi(update_avatar_schema), userinfoHandler.updateAvatar)


module.exports = router