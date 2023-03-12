const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database()
// get all reminders from db

exports.main = async(event, context) => {
  return await db.collection('Reminders').get()
}
