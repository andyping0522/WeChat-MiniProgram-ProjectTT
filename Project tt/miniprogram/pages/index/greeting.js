const morning = [
  '早安，今天的PP，依旧超级爱你', 
  '太阳照常升起，PP照常想你',
  '早安藤藤宝贝，要记得开心',
  '元气满满的一天，快告诉宝贝有没有好好吃早饭',
]

const noon = [
  '中午啦，记得吃一顿好的',
  '藤藤宝贝，平平想死你了',
  '我的宝贝，你有没有在想我',
  '中午好呀，我亲爱的藤藤宝贝'
]

const afternoon = [
  '下午咯，宝贝再坚持坚持就是下班！',
  '又是无聊的下午，记得起来动动',
  '下午好，藤藤宝贝~',
  '午后的阳光，是我对你的温暖怀抱'
]

const evening = [
  '晚上啦宝贝，要好好吃晚饭',
  '皎洁的月光，如同你的笑容，照亮了PP的世界',
]

const lateNight = [
  '差不多该睡啦，宝贝',
  '记得早点休息，我的月亮',
  '早睡的宝贝，才会有奖励抱抱'
]

const warning = [
  '还不睡，是不是太想我了',
  '揍嘛啊，明天再来看我吧宝贝',
  '再不睡觉，明天没有抱抱了！'
]



function getGreetingMsg(){
    const time = new Date()
    const hour = time.getHours()
    if (hour >= 5 && hour < 11) {
      // morning
      return (morning[Math.floor(Math.random() * morning.length)])
    } else if (hour >= 11 && hour < 13) {
      // noon
      return (noon[Math.floor(Math.random() * noon.length)])
    } else if (hour >= 13 && hour < 18) {
      // afternoon
      return (afternoon[Math.floor(Math.random() * afternoon.length)])
    } else if (hour >= 18 && hour < 22) {
      // early night
      return (evening[Math.floor(Math.random() * evening.length)])
    } else if (hour >= 22 || hour <= 1) {
      // late night
      return (lateNight[Math.floor(Math.random() * lateNight.length)])
    } else {
      // warning
      return (warning[Math.floor(Math.random() * warning.length)])
    } 
  }

  module.exports.getGreetingMsg = getGreetingMsg