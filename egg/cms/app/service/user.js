'use strict';

const {Service} = require('egg')
class UserService extends Service{
  async list(){
    return await this.app.mysql.select('user')
  }
  async create(user){
    return await this.app.mysql.insert('user', user)
  }
  async update(user) {
    return await this.app.mysql.update('user', user)
  }
  async destroy(id) {
    console.log(id);
    return await this.app.mysql.delete('user', { id: +id })
  }
}
module.exports = UserService