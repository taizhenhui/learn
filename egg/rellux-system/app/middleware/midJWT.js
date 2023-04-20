module.exports = (secret) => {
  // options 是针对该中间件的配置，app是egg全局应用对象
  return async function jwtErr(ctx, next) {
    const token = ctx.request.headers.authorization; // 若是没有 token，返回的是 null 字符串
    // console.log(token,'token');
    let decode
    if(token != 'null' && token) {
      try {
        decode = ctx.app.jwt.verify(token, secret); // 验证token
        await next();
      } catch (error) {
        console.log('error', error)
        ctx.status = 200;
        ctx.body = {
          msg: 'token已过期，请重新登录',
          code: 401,
        }
        return;
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 401,
        msg: 'token不存在',
      };
      return;
    }
  }
}