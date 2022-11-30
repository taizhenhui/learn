'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/user', controller.user.index);
  router.get('/user/list', controller.user.getList);
  router.get('/user/data', controller.user.getDatas);
  router.get('/user/data/:id', controller.user.getData);
  router.get('/user/newCtx', controller.user.newCtx);
  router.get('/user/newRequest', controller.user.newRequest);
  router.get('/user/newResponse', controller.user.newResponse);
  // router.post('/user/newCtx', controller.user.newCtx);
};
