module.exports = (app) => {
  const { router, controller } = app
  // router.get('/', controller.home.index)
  router.get('/', 'home.index')
  router.get('/login', 'user.login')
  router.redirect('/sign-in', '/login')
  router.resources("blogs", "/b", "blog");
}