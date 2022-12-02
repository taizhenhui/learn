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
    let map = {}
    resources.forEach(i => {
      i.children = []
      map[i.id] = i
    })
    resources.forEach(i => {
      if (i.parent_id === 0) {
        rootMenus.push(i)
      } else {

        map[i.parent_id].children.push(i)
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
      await mysql.insert('role_resource',{
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
    await mysql.query(sql, roleId)
    for (let i = 0, len = userIds.length; i < len; i++) {
      let id = userIds[i]
      await mysql.insert('role_user',{
        role_id: roleId,
        user_id: id
      })
    }
  }
}

module.exports = Service