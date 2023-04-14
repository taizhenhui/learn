module.exports = (options, app) => {
  return async function (ctx, next) {

    const token = ctx.cookies.get('token');

    if (!token) {
      ctx.redirect('/login')
      return
    }

    const resp = await app.axios.get(app.config.$apiBase + '/api/user/whoami', {
      headers: {
        authorization: `Bearer ${token}`
      }
    })

    if (resp.data.code) {
      // 登录过期
      ctx.redirect('/login')
      return
    }

    // ctx.state.user = resp.data.data
    ctx.locals.user = resp.data.data

    await next()
  }
}