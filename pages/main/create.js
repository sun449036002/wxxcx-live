// pages/main/create.js
const app = getApp();

const APIURL = app.globalData.apiurl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomTitle: "",
    coverImg: "",
    clientCoverImg: "",
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
    var self = this; 
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
    if (this.data.roomTitle == "" || this.data.roomTitle.length > 10 || this.data.coverImg == '') {
      wx.showModal({
        title: '提示',
        content: "1.房间名称不得为空且不得超过10个字符, \r\n 2.且必须上传一张封面图",
        showCancel: false
      })
      return false;
    }
    wx.request({
      url: APIURL + 'room/Create',
      data: {
        name: self.data.roomTitle || "",
        coverImg: self.data.coverImg
      },
      success: function(res) {
        console.log("success", res);
        if (res.data.code > 0) {
          wx.showModal({
            title: '提示',
            content: res.data.msg || "",
            showCancel: false
          })
          return;
        }
        if (!res.data.roomId) {
          wx.showModal({
            title: '提示',
            content: "房间ID有误，请与管理员联系",
            showCancel: false
          })
          return;
        }
        wx.navigateTo({
          url: '/pages/live/live?roomId=' + res.data.roomId,
        })
      },
      fail: function(res) {
        console.log("fail", res);
      }
    })
  },
  //选择上传图片
  uploadImg: function(){
    var self = this;
    wx.chooseImage({
      success: function(res) {
        console.log(res);
        var fpath = res.tempFilePaths[0];
        wx.uploadFile({
          url: APIURL + 'room/UploadImg',
          filePath: fpath,
          name: 'cover',
          success: function(res) {
            let data = JSON.parse(res.data);
            console.log(data);
            console.log(self.data)
            self.setData({
              coverImg: data.coverImg,              
              clientCoverImg: fpath
            });
          },
          fail: function(res) {
            console.log("fail:", res)
          }
        })
      },
    })
  },

  imgerror: function(e){
    console.log(e);
  },
  loadover: function(e){
    console.log(e)
  },
})