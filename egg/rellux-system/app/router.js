const mapper = {};

mapper.mapUser = function (app){
  const {router} = app;
  const prefix = "/user";
  router.get(`${prefix}`, "user.index");
  router.post(`${prefix}/login`, "user.login");
}

mapper.mapRole = function (app){
  const {router} = app;
  const prefix = "/role";
  router.get(`${prefix}`, "role.index");
}


module.exports = app => {
  Object.values(mapper).forEach(m=>m(app));
}