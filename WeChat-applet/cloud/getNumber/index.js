// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  let db = cloud.database()
  const number = await db.collection('number')
  .skip(event.page*event.pageSize)
  .limit(event.pageSize)
  .get()
  return {
    number
  }
}