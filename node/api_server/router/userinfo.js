const express = require('express')
const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema } = require('../schema/user')
const userinfoHandler = require('../router_handler/userinfo')

const router = express.Router()

router.get('/userinfo', userinfoHandler.getUserInfo)
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfoHandler.updateUserInfo)


module.exports = router