// index.js
// const app = getApp()
const { envList } = require('../../envList.js');
const greeting = require('./greeting.js')
//const startDate = new Date("2023-02-18T00:00:00.106Z");

Page({
  data: {
    greetingMsg: 'hi',
    reminderList: [],
    anniversaryList: [],
    daysElapsed: 0
  },

  async onShow(){
    // get greeting msg
    const _greetingMsg = greeting.getGreetingMsg()
    this.setData({
      greetingMsg: _greetingMsg
    })
    // get days of relationship
    //const today = new Date()
    //const reminder = await wx.cloud.callFunction({name: 'getReminders'})
    //console.log(reminder.result.data)
    // load list of events from db

    // done
  },

  
  
});
