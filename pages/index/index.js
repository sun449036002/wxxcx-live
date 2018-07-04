//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "授权"//页面标题为路由参数
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(getCurrentPages());
    wx.navigateBack({
      delta : 1
    });
    console.log('backing')
  }
})
