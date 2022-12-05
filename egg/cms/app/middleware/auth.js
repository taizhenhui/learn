const { verify } = require('jsonwebtoken')

const verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    verify(token, secret, (err, payload) => {
      if (err) reject(err)
      resolve(payload)
    })
  })
}

module.exports = (options, app) => {
  return async (ctx, next) => {
    const authorization = ctx.get('authorization')
    if (authorization) {
      try {
        let user = await verifyToken(authorization, app.config.jwtSecret)
        ctx.session.user = user
        await next()
      } catch (error) {
        console.log(error);
        ctx.status = 401;
        ctx.body = 'TOKEN验证失败';
      }
    } else {
      ctx.status = 401;
      ctx.body = '没有TOKEN';
    }
  }
}

// module.exports = (options, app) => {
//   return async (ctx, next) => {
//     const authUrls = options.authUrls
//     if (authUrls.includes(ctx.url)) {
//       const authorization = ctx.get('authorization')
//       if(authorization){
//         try {
//           let user = await verifyToken(authorization, app.config.jwtSecret)
//           ctx.session.user = user
//           await next()
//         } catch (error) {
//           console.log(error);
//           ctx.status = 401;
//           ctx.body = 'TOKEN验证失败';
//         }
//       }else{
//         ctx.status = 401;
//         ctx.body = '没有TOKEN';
//       }
//     } else{
//       await next()
//     }
//   }
// }