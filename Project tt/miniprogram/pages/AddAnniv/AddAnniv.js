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
  }

})