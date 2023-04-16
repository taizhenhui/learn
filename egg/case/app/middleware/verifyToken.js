module.exports = (options, app) => {
  return async function (ctx, next) {
    const token = ctx.cookies.get('token')
    const user = await ctx.service.user.whoAmI(token)

    if (!user) {
      ctx.redirect('/login')
      return
    }
    
    ctx.locals.user = user
    await next()
  }
}
