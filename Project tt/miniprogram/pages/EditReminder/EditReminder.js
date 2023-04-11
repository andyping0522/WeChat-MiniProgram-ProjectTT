// pages/EditReminder/EditReminder.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    assigned: "",
    assignedIndex: -1,
    state: "",
    title: "",
    people: ["PP", "TT"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.id != undefined){
      this.setData({
        id: options.id
      })
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    // get reminder by id
    if (this.data.id.length > 0) {
      //console.log(this.data.id)
      await wx.cloud.callFunction({
        name: "getReminderById",
        data: this.data
      }).then(data => {
        this.setData({
          title: data.result.data[0].title,
          state: data.result.data[0].state,
          assigned: data.result.data[0].assigned
        })
      })
      if (this.data.assigned === "PP") {
        this.setData({
          assignedIndex: 0
        })
      } else {
        this.setData({
          assignedIndex: 1
        })
      }
    }
  },

  onAssignment(e) {
    this.setData({
      assignedIndex: e.detail.value,
      assigned: this.data.people[e.detail.value]
    })
  },

  onTitleInput(e) {
    //console.log(e.detail.value)
    this.setData({
      title: e.detail.value
    })
  },

  /**
   submit the update request to db
   */
  async onSubmitUpdate() {
    
    if (this.data.title === "") {
      wx.showToast({
        title: "要有标题",
        icon: "error",
        duration: 2000
      })
      return
    }

    if (this.data.assigned === "") {
      wx.showToast({
        title: "要指定谁完成",
        icon: "error",
        duration: 2000
      })
      return
    }

    await wx.cloud.callFunction({name: "UpdateReminder", data: this.data}).then(
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

  /**
   submit the complete request to the db
   */
  async onSubmitComplete() {
    await wx.cloud.callFunction({name: "CompleteReminder", data: this.data}).then(
      () => {
        wx.showToast({
          title: '任务完成！',
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
  async onSubmitCancel() {
    wx.switchTab({
      url: '../index/index',
    })
  }

})