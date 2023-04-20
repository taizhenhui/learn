const Service = require('egg').Service

module.exports = class extends Service {
  async index() {
    const { body } = this.ctx.request
    let data = {
      account: body.account || '',
      phone: body.phone || '',
      email: body.email || '',
      operator_name: body.operator_name || '',
    }
    let wheres = {}
    Object.keys(data).forEach(i => {
      if (body[i] !== '') {
        wheres[i] = body[i]
      }
    })
    let limit = body.pageSize || 10
    let offset = body.pageNum || 1
    const sum = await this.app.mysql.select('t_system_account', {
      where: {
        ...wheres
      },
    })
    const results = await this.app.mysql.select('t_system_account', {
      where: {
        ...wheres
      }, // WHERE 条件
      orders: [['id', 'asc']], // 排序方式
      limit: +limit, // 返回数据量
      offset: (offset - 1) * (+limit), // 数据偏移量
    });

    return {
      rows: results,
      total: sum.length,
      pageNum: +offset,
      pageSize: +limit
    }
  }
  async findByName(account) {
    try {
      const result = await this.app.mysql.get('t_system_account', { account });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }


}