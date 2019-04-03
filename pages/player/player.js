// pages/player/player.js
const app = getApp();
const RTMPURL = app.globalData.rtmpurl;

var roomId = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomId: 0,
    isFullScene: false,
    viewNum: 0,
    rtmpUrl: RTMPURL
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("onLoad options", options)
    roomId = options.roomId;
    wx.setNavigationBarTitle({
      title: "房间号：" + options.roomId //页面标题为路由参数
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log('onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log('onShow');
    var self = this;
    app.checkLogin(function() {
      self.setData({
        roomId: roomId || 0
      })
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log('onHide');
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
  statechange(e) {
    console.log('live-player code:', e.detail.code)
  },
  error(e) {
    console.error('live-player error:', e.detail.errMsg)
  },
  /**
   * 进入全屏模式
   */
  toFullScene: function() {
    this.setData({
      isFullScene: !this.data.isFullScene
    })
  },
  /**
   * 组件接收到消息
   */
  iReceivedMsg: function (res) {
    console.log("iReceivedMsg", res);
    if (res.detail) {
      this.setData({
        viewNum: res.detail.personNum || 0
      })
    }
  },

  //刷新谜题
  refreshRiddle: function(){
    console.log("player刷新谜题");
    var quesCom = this.selectComponent('#ques');
    quesCom.setData({
      riddleText: "",
      riddleType: "timer"
    });
    quesCom.getRiddle();
  },
})