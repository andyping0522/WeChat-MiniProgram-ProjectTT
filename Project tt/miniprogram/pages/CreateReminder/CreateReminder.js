// pages/CreateReminder/CreateReminder.js
Page({

  data: {
    title: "",
    date: "",
    createdBy: "",
    assignedTo: "",
    people: ["PP", "TT"],
    person: ""
  },


  onShow(options) {

  },

  onTitleInput(e) {
    //console.log(e.detail.value)
    this.setData({
      title: e.detail.value
    })
  },

  onAssignment(e) {
    this.setData({
      assignedTo: e.detail.value,
      person: this.data.people[e.detail.value]
    })
  },

  async onSubmit() {
    const date_ = new Date()
    this.setData({
      date: date_
    })

    if (this.data.title === "") {
      wx.showToast({
        title: "要有标题",
        icon: "error",
        duration: 2000
      })
      return
    }

    if (this.data.assignedTo === "") {
      wx.showToast({
        title: "要指定谁完成",
        icon: "error",
        duration: 2000
      })
      return
    }

    await wx.cloud.callFunction({name: "AddReminder", data: this.data}).then(
      () => {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1000
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '../index/index',
          })
        }, 1000)
      }
    )

  }

})