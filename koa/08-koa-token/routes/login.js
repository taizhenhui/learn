const Router = require("koa-router")
const router = new Router()
router.get("/",async (ctx,next)=>{

   //获取cookie
   // console.log(ctx.cookies.get("age"))

   //设置cookie
   // ctx.cookies.set("location","dalian")
   await ctx.render("login") //自动找views/home.ejs
})


module.exports = router