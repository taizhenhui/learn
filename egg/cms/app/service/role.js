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
    resources.forEach(i=>{
      i.children = []
      map[i.id] = i
    })
    resources.forEach(i=>{
      if(i.parent_id === 0){
        rootMenus.push(i)
      }else{
        
        map[i.parent_id].children.push(i)
      }
    })
    return rootMenus
  }
}

module.exports = Service