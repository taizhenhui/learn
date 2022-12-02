'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.home.index);
  router.redirect('/', '/swagger-ui.html', 302);
  router.resources('user', '/api/user', controller.user)
  router.resources('role', '/api/role', controller.role)
  router.resources('roleUser', '/api/roleUser', controller.roleUser)
  router.resources('roleResource', '/api/roleResource', controller.roleResource)
  router.resources('resource', '/api/resource', controller.resource)


  router.get('/api/role/getResource', controller.role.getResource) // 获取所有的资源
  // router.get('/api/role/setResource', controller.role.setResource) // 设置角色和资源的关系

  // router.get('/api/role/getUser', controller.role.getUser) // 获取所有的用户
  // router.get('/api/role/setUser', controller.role.setUser) // 设置角色和用户的关系
};
