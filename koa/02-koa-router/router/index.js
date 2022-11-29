const Router = require('koa-router')
const router = new Router()

const userRouter = require('./user')
const listRouter = require('./list')
const homeRouter = require('./home')

// 统一加前缀
// router.prefix('/api')
router.use('/user', userRouter.routes())
router.use('/list', listRouter.routes())
router.use('/home', homeRouter.routes())

router.redirect('/','/home')

module.exports = router