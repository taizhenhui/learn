const mapper = {};

mapper.mapUser = function (app){
  const {router} = app;
  const _jwt = app.middleware.midJWT(app.config.jwt.secret)
  const prefix = "/user";

  router.post(`${prefix}/login`, "user.login");
  router.post(`${prefix}`, _jwt, "user.index");
}

mapper.mapRole = function (app){
  const {router} = app;
  const _jwt = app.middleware.midJWT(app.config.jwt.secret)
  const prefix = "/role";

  router.get(`${prefix}`, _jwt, "role.index");

}


module.exports = app => {
  Object.values(mapper).forEach(m=>m(app));
}