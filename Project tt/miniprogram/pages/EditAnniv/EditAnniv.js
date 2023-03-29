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

  /**
   * Lifecycle function--Called when page show
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
  }
})