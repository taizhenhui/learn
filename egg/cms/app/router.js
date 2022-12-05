'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.home.index);
  let auth = app.middleware.auth({},app)
  router.redirect('/', '/swagger-ui.html', 302);
  // CRUD 路由
  router.resources('user', '/api/user', controller.user)
  router.resources('role', '/api/role', controller.role)
  router.resources('roleUser', '/api/roleUser', controller.roleUser)
  router.resources('roleResource', '/api/roleResource', controller.roleResource)
  router.resources('resource', '/api/resource', controller.resource)


  router.get('/api/role/getResource', controller.role.getResource) // 获取所有的资源
  router.post('/api/role/setResource', controller.role.setResource) // 设置角色和资源的关系

  router.get('/api/role/getUser',auth, controller.role.getUser) // 获取所有的用户
  router.post('/api/role/setUser',auth, controller.role.setUser) // 设置角色和用户的关系

  router.get('/api/captcha', controller.user.captcha)
  router.post('/api/checkCaptcha', controller.user.checkCaptcha)
  router.post('/signup', controller.user.signup) // 注册
  router.post('/signin', controller.user.signin) // 登录


};
/*
 * 1. 设置黑白名单
 */ 