// index.js
// const app = getApp()
const { envList } = require('../../envList.js');
const greeting = require('./greeting.js')
const today = new Date()


Page({
  data: {
    greetingMsg: '',
    reminderList: [],
    anniversaryList: [],
    reminderCount: -1,
    annivCount: -1,
    key: "18e9629ea2de4a7ea21c5821acb80cca",
    city_code: 101270101,
    weather: {},
    weather_now: {},
    ready: false,
    countdown: "",
    displayCountdown: 0,
    weatherPidu: {},
    weatherPiduNow: {},
    weatherJinniu: {},
    weatherJinniuNow: {}
  },

  async onLoad() {
    
  },

  async onShow(){
    // get greeting msg
    const _greetingMsg = greeting.getGreetingMsg()
    this.setData({
      greetingMsg: _greetingMsg
    })
    this.getCountDown()
    this.getWeather()

    // load list of events from db
    const reminders = await wx.cloud.callFunction({name: 'getPendingReminders'})
    const pendingReminders = reminders.result.data
    const anniv = await wx.cloud.callFunction({name: "getAnniversaries"})
    const anniversaries = anniv.result.data
    //console.log(anniv)

    // calculate days elapsed since start date
    for (var i=0; i<anniversaries.length; i++) {
      var serverDate = new Date(anniversaries[i].date)
      anniversaries[i].days = Math.ceil((serverDate - today)/(1000 * 60 * 60 * 24)) 
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
    wx.navigateTo({
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
  },

  async toEditAnnivPage(element) {
    const annivIndex = element.currentTarget.dataset.index
    const anniv = this.data.anniversaryList[annivIndex]
  
    wx.navigateTo({
      url: '../EditAnniv/EditAnniv?id=' + anniv._id,
    })
  },

  async getWeather() {
    // get weather info for the day Chengdu
    wx.request({
      url: "https://devapi.qweather.com/v7/weather/3d",
      method: "GET",
      data: {
        key: this.data.key,
        location: this.data.city_code
      },
      success: (res) => {
        //console.log(res)
        this.setData({
          weather: res.data.daily[0]
        })
      }
    })

    wx.request({
      url: "https://devapi.qweather.com/v7/weather/now",
      method: "GET",
      data: {
        key: this.data.key,
        location: this.data.city_code
      },
      success: (res) => {
        //console.log(res)
        this.setData({
          weather_now: res.data.now,
          ready: true
        })
      } 
    })

    // Jinniu
    wx.request({
      url: "https://devapi.qweather.com/v7/weather/3d",
      method: "GET",
      data: {
        key: this.data.key,
        location: 101270118
      },
      success: (res) => {
        //console.log(res)
        this.setData({
          weatherJinniu: res.data.daily[0]
        })
      }
    })

    wx.request({
      url: "https://devapi.qweather.com/v7/weather/now",
      method: "GET",
      data: {
        key: this.data.key,
        location: 101270118
      },
      success: (res) => {
        //console.log(res)
        this.setData({
          weatherJinniuNow: res.data.now,
          ready: true
        })
      } 
    })

    wx.request({
      url: "https://devapi.qweather.com/v7/weather/3d",
      method: "GET",
      data: {
        key: this.data.key,
        location: 101270107
      },
      success: (res) => {
        //console.log(res)
        this.setData({
          weatherPidu: res.data.daily[0]
        })
      }
    })

    // Pidu
    wx.request({
      url: "https://devapi.qweather.com/v7/weather/now",
      method: "GET",
      data: {
        key: this.data.key,
        location: 101270107
      },
      success: (res) => {
        //console.log(res)
        this.setData({
          weatherPiduNow: res.data.now,
          ready: true
        })
      } 
    })
  },

  async getCountDown() {
    var clockOffTime = wx.getStorageSync('clockOffTime');
    var isClockedOn = wx.getStorageSync('isClockedOn')
    //console.log(isClockedOn)
    if (isClockedOn) {
      //console.log(clockOffTime)
      var timeRemaining = clockOffTime - new Date().getTime();
      if (timeRemaining <= 0) {
        wx.setStorageSync('isClockedOn', false)
        wx.setStorageSync('clockOffTime', null)
      } else {
        var hours = Math.floor(timeRemaining / 3600000);
        var minutes = Math.floor((timeRemaining % 3600000) / 60000);
        this.setData({
          displayCountdown: 1,
          countdown: hours + ' 小时 ' + minutes + ' 分钟 '
        });
      }
    }
  }

  
  
});
