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
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})