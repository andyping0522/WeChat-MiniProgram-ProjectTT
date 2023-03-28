// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
// 云函数入口函数
exports.main = async (context) => {
  // update the record to set state to 'complete'
  return await db.collection("Reminders").where({
    "_id": context.id
  }).update({
    data: {
      "state": "complete"
    }
  })
}