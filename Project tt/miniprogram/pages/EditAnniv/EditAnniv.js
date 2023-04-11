// pages/EditAnniv/EditAnniv.js

Page({

  /**
   * Page initial data
   */
  data: {
    id: "",
    date: "",
    title: ""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    if (options.id.length != undefined) {
      this.setData({
        id: options.id
      })
    }
  },

  cutStr(str, limit) {
    return str.length > limit ? str.substring(0, limit) : str
  },

  /**
   * Lifecycle function--Called when page show
   */
  async onShow() {
    if (this.data.id.length > 0) {
      //console.log(this.data.id)
      await wx.cloud.callFunction({
        name: "getAnnivById",
        data: this.data
      }).then(data => {
        this.setData({
          title: data.result.data[0].title,
          date: this.cutStr(data.result.data[0].date, 10)
        })
      })
    }
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
    await wx.cloud.callFunction({name: "EditAnniv", data: this.data}).then(
      () => {
        wx.showToast({
          title: '更新成功',
          icon: 'success',
          duration: 1000
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../index/index',
          })
        }, 1000)
      }
    )
  },

  async onDelete() {
    await wx.cloud.callFunction({name: "DeleteAnniv", data: this.data}).then(
      () => {
        wx.showToast({
          title: '已删除',
          icon: 'success',
          duration: 1000
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../index/index',
          })
        }, 1000)
      }
    )
  },

  /**
   * Cancel update, go back to main page
   */
  async onCancel() {
    wx.switchTab({
      url: '../index/index',
    })
  }
})