'use strict';

const BaseService = require('./base')
class Service extends BaseService {
  constructor(...args) {
    super(...args)
    this.entity = 'user'
  }
  async list(pageNum, pageSize, where) {
    // 查询当页的数据 特定页的记录数组
    const data = await this.app.mysql.select(this.entity, {
      where,
      order: [['id', 'asc']],
      offset: (pageNum - 1) * pageSize,
      limit: pageSize,
    })
    for (let i = 0, len = data.length; i < len; i++) {
      let user = data[i]
      const select_sql = `SELECT resource.* FROM resource 
      INNER JOIN role_resource ON resource.id = role_resource.resource_id
      INNER JOIN role_user ON role_resource.role_id = role_user.role_id
      WHERE role_user.user_id=?;`
      let resources = await this.app.mysql.query(select_sql, user.id)
      let rootMenus = []
      resources.forEach(item => { // 遍历对象数组
        item.children = resources.filter(info => info.parent_id === item.id) // 找到每个对象的子节点 
        if (item.parent_id === 0) rootMenus.push(item) // 将一层节点放入新数组中
      })
      user.resources = rootMenus
    }


    // 总条数
    const total = await this.app.mysql.count(this.entity, where)
    return { data, total }
  }

  async signup(body) {
    await this.create(body)
  }
  async signin(body) {
    const { ctx, app: { mysql } } = this
    const{ username, password } = ctx.request.body
    const result = await mysql.select('user', {
      where: { username, password },
      limit: 1
    })
    return result
   
  }
}
module.exports = Service