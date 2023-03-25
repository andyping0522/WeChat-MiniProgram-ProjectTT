// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
const db_date =  db.serverDate()
// 云函数入口函数
exports.main = async (context) => {
  return await db.collection("Reminders").add({
    data: {
      title: context.title,
      assigned: context.person,
      date: db_date,
      createdBy: "P",
      state: "pending"
    }
  })
}