// pages/ClockOn/ClockOn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnText: "",
    time: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const isClockedOn = wx.getStorageSync('isClockedOn')
    const time_ = wx.getStorageSync('clockOffTime')
    const prevTime = wx.getStorageSync('prevTime')
    if (isClockedOn) {
      this.setData({
        btnText: "更新时间",
        time: prevTime
      })
    } else {
      this.setData({
        btnText: "确认时间"
      })
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  async onTimeInput(e) {
    this.setData({
      time: e.detail.value
    })
  },

  async onSubmit() {
    if (this.data.time === "") {
      wx.showToast({
        title: "要输入时间",
        icon: "error",
        duration: 2000
      })
      return
    }

    const currentDate = new Date();
    // create date object with selected time and today's date
    const selectedTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), this.data.time.split(':')[0], this.data.time.split(':')[1]);
    
    selectedTime.setHours(selectedTime.getHours() + 9)
    selectedTime.setMinutes(selectedTime.getMinutes() + 30)
    wx.setStorageSync('clockOffTime', selectedTime)
    wx.setStorageSync('isClockedOn', true)
    wx.setStorageSync('prevTime', this.data.time)
    wx.showToast({
      title: '打卡成功',
      icon: 'success',
      duration: 1000
    })
    setTimeout(function () {
      wx.switchTab({
        url: '../index/index',
      })
    }, 1000)
  }

})