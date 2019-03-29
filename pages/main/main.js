// pages/main/main.js
const app = getApp();
const APIURL = app.globalData.apiurl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    isEnd: false,
    liveList: []
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    this._getLiveList();
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

  /**
   * 获取直播列表  分页
   */
  _getLiveList: function(page) {
    var self = this;
    page = !page ? 1 : page;
    if (self.data.isEnd) {
      return;
    }
    wx.request({
      url: APIURL + 'room/list?page=' + page,
      success: function(res) {
        self.setData({
          page: res.data.page,
          isEnd: res.data.isEnd,
          liveList: self.data.liveList.concat(res.data.items || [])
        })
      },
      fail: function(res){
       wx.showToast({
         title: res.errMsg || '111',
         icon: '',
         image: '',
         duration: 0,
         mask: true,
         success: function(res) {},
         fail: function(res) {},
         complete: function(res) {},
       })
      }
    })
  },
  /**
   * 滚动到底部触发
   */
  scrollToLower: function(res) {
    console.log(res);
    this._getLiveList(this.data.page);
  }
})