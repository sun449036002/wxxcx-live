// pages/main/create.js
const app = getApp();

const APIURL = app.globalData.apiurl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomTitle: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  roomTitleChange: function(res) {
    this.setData({
      roomTitle: res.detail.value || ""
    })
  },

  /**
   * 创建房间
   */
  createRoom: function(e) {
    var self = this;
    if (this.data.roomTitle == "" || this.data.roomTitle.length > 10) {
      wx.showModal({
        title: '提示',
        content: '房间名称不得为空且不得超过10个字符',
        showCancel: false
      })
      return false;
    }
    wx.request({
      url: APIURL + 'room/Create',
      data : {
        name : self.data.roomTitle || ""
      },
      success : function(res) {
        console.log("success", res);
        if(res.data.code > 0) {
          wx.showModal({
            title: '提示',
            content: res.data.msg || "",
            showCancel : false
          })
          return;
        }
        if(!res.data.roomId) {
          wx.showModal({
            title: '提示',
            content:"房间ID有误，请与管理员联系",
            showCancel: false
          })
          return;
        }
        wx.navigateTo({
          url: '/pages/live/live?roomId=' + res.data.roomId,
        })
      },
      fail : function(res) {
        console.log("fail",res);
      }
    })
  }
})