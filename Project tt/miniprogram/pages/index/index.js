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
    daysElapsed: 0,
    reminderCount: -1,
    annivCount: -1
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
    const anniv = await wx.cloud.callFunction({name: "getAnniversaries"})
    const anniversaries = anniv.result.data
    //console.log(anniv)

    // calculate days elapsed since start date
    for (var i=0; i<anniversaries.length; i++) {
      var serverDate = new Date(anniversaries[i].date)
      anniversaries[i].days = Math.ceil(Math.abs(serverDate - today)/(1000 * 60 * 60 * 24)) 
      //console.log(anniversaries[i].days)
    }
    this.setData({
      reminderList: pendingReminders,
      reminderCount: pendingReminders.length,
      anniversaryList: anniversaries,
      annivCount: anniversaries.length
    })
    
  },

  async toAddReminderPage() {
    wx.switchTab({
      url: '/pages/CreateReminder/CreateReminder'
    })
  },

  async toEditReminderPage(element) {
    
    const reminderIndex = element.currentTarget.dataset.index
    const reminder = this.data.reminderList[reminderIndex]
    wx.navigateTo({
      url: '../EditReminder/EditReminder?id=' + reminder._id,
    })
  },

  async toAddAnnivPage() {
    wx.navigateTo({
      url: '../AddAnniv/AddAnniv',
    })
  }

  
  
});
