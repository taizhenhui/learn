'use strict';

const {Service} = require('egg')
class UserService extends Service{
  async list(){
    return await this.app.mysql.select('user')
  }
  async create(user){
    return await this.app.mysql.insert('user', user)
  }
}
module.exports = UserService