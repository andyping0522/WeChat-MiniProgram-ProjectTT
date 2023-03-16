// index.js
// const app = getApp()
const { envList } = require('../../envList.js');
const greeting = require('./greeting.js')
const today = new Date()
//const startDate = new Date("2023-02-18T00:00:00.106Z");

Page({
  data: {
    greetingMsg: '',
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
    const timeDiff = Math.abs(getApp().globalData.startDate - today)
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
    
    this.setData({
      daysElapsed: days
    })
    // load list of events from db
    const reminders = await wx.cloud.callFunction({name: 'getPendingReminders'})
    const pendingReminders = reminders.result.data

    
    this.setData({
      reminderList: pendingReminders
    })
    // for (var i=0; i<pendingReminders.length; i++) {
    //   console.log(pendingReminders[i].title)
    // }
    // load list of events from db

    // done
  },

  
  
});
