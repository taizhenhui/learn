const { Controller } = require('egg');

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = '<h1>hello user</h1>';
    let data = {
      id: 2022,
      nowTime: this.app.currentTime(),
      nowTimeProp: this.app.timeProp,
      name: 'tom',
      age: 18,
      skills:[
        'aa',
        'bb',
        'cc'
      ]
    }
    await ctx.render('user.html', data)
  }
  async getList() {
    const { ctx } = this;
    const arr = [ 'aa', 'bb', 'cc' ];
    await new Promise(resolve => {
      setTimeout(() => {
        resolve(ctx.body = arr);
      }, 2000);
    });
  }
  async getDatas() {
    const { ctx } = this;
    ctx.body = ctx.query
  }
  async getData() {
    const { ctx } = this;
    ctx.body = ctx.params
  }
  async newCtx() {
    const { ctx } = this;
    const params = ctx.params('id')
    console.log(params);
    ctx.body = params
  }
  async newRequest() {
    const { ctx } = this;
    const token = ctx.request.token
    ctx.body = {
      status: 200,
      data: token
    }
  }
  async newResponse() {
    const { ctx } = this;
    ctx.response.token = 'tai--tai'
    ctx.body = 'newResponse'
  }
}


module.exports = UserController;
