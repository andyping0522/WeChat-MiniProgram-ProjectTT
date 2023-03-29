// pages/AddAnniv/AddAnniv.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    title: ""
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    
  },

  onDateInput(e) {
    //console.log(e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  onTitleInput(e) {
    //console.log(e.detail.value)
    this.setData({
      title: e.detail.value
    })
  },

  async onSubmit() {
    // submit the add anniversary request
    if (this.data.title === "") {

      wx.showToast({
        title: "要有标题",
        icon: "error",
        duration: 2000
      })
      return
    }

    if (this.data.date === "") {
      wx.showToast({
        title: "要有日期",
        icon: "error",
        duration: 2000
      })
    }

    await wx.cloud.callFunction({
      name: "AddAnniv",
      data: this.data
    }).then(() => {
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 1000
      })
      setTimeout(function () {
        wx.switchTab({
          url: '../index/index',
        })
      }, 1000)
    })
  }
})