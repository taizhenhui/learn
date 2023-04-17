const Service = require('egg').Service

module.exports = class extends Service {
  async getProvinces() {
    // const key = 'province'
    // const provinces = await this.app.redis.get(key)

    // if (provinces)  return JSON.parse(provinces)

    // const resp = await this.app.axios.get(`${this.config.$apiBase}/api/local`)
    // // 缓存
    // this.app.redis.set(key, JSON.stringify(resp.data))
    // return resp.data
    const provinces = await this.app.redis.get("province");
    return JSON.parse(provinces);
  }
}
