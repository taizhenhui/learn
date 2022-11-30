'use strict';

const { app } = require('egg-mock/bootstrap');

describe('user - index', () => {
  it('user index page', () => {
    return app.httpRequest()
      .get('/user').expect(200)
      .expect('<h1>hello user</h1>');
  });
  it('user getList page', async () => {
    return await app.httpRequest().get('/user/list')
      .expect(200)
      .expect(Array);
  });
});
