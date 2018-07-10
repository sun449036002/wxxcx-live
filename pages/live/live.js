// pages/live/live.js
const app = getApp();
const RTMPURL = app.globalData.rtmpurl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomId: 0,
    viewNum: 0,
    isFullScene: false,
    livePlayHeight: "50vh",
    rtmpUrl: RTMPURL
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      roomId: options.roomId || 0
    });
    wx.setNavigationBarTitle({
      title: "房间号：" + options.roomId //页面标题为路由参数
    })
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
    console.log('onShow');
    app.checkLogin();
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
  onShareAppMessage: function(res) {
    var self = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    console.log('/pages/player/player?roomId=' + self.data.roomId);
    return {
      title: '我的直播',
      path: '/pages/player/player?roomId=' + self.data.roomId
    }
  },
  /**
   * 输出直播日志信息
   */
  statechange(e) {
    console.log('live-pusher code:', e.detail.code)
  },

  /**
   * 进入全屏模式
   */
  toFullScene: function() {
    this.setData({
      isFullScene: true,
      livePlayHeight: "90vh"
    })
  },
  /**
   * 转换摄像头 前后
   */
  switchCamera: function(e) {
    wx.createLivePusherContext().switchCamera();
    console.log('转换摄像头ok');
  },
  /**
   * 组件接收到消息
   */
  iReceivedMsg: function(res) {
    console.log("iReceivedMsg", res);
    if(res.detail) {
      this.setData({
        viewNum : res.detail.personNum || 0      
      })
    }
  }
})