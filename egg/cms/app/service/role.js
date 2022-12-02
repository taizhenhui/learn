'use strict';

const BaseService = require('./base')
class Service extends BaseService {
  constructor(...args) {
    super(...args)
    this.entity = 'role'
  }
  async getResource() {
    const { app: { mysql } } = this
    const resources = await mysql.select('resource')
    let rootMenus = []
    resources.forEach(item => { // 遍历对象数组
      item.children = resources.filter(info => info.parent_id === item.id) // 找到每个对象的子节点 
      if (item.parent_id === 0) {
        rootMenus.push(item) // 将一层节点放入新数组中
      }
    })
    return rootMenus
  }
  async setResource({ roleId, resourceIds }) {
    const { app: { mysql } } = this
    const sql = `delete from role_resource where role_id=?`
    await mysql.query(sql, roleId)
    for (let i = 0, len = resourceIds.length; i < len; i++) {
      let id = resourceIds[i]
      await mysql.insert('role_resource', {
        role_id: roleId,
        resource_id: id
      })
    }
  }
  async getUser() {
    const { app: { mysql } } = this
    const users = await mysql.select('user')
    return users
  }
  async setUser({ roleId, userIds }) {
    const { app: { mysql } } = this
    const sql = `delete from role_user where role_id=?`
    const conn = await mysql.beginTransaction()
    try {
      await conn.query(sql, roleId)
      for (let i = 0, len = userIds.length; i < len; i++) {
        let id = userIds[i]
        await conn.insert('role_user', {
          role_id: roleId,
          user_id: id
        })
      }
      await conn.commit()
      // (await conn).commit()
    } catch (err) {
      // (await conn).rollback
      await conn.rollback()
      throw err
    }
  }
}

module.exports = Service