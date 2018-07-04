//app.js
const API_URL = "https://talk.sun.zj.cn/v1/";
App({
  onLaunch: function() {
    var self = this;
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
  },
  globalData: {
    apiurl: API_URL,
    rtmpurl: "https://www.sun.zj.cn/live",
    socketurl: "wss://talk.sun.zj.cn",
    userInfo: null
  },
  /**
   * 检测登录
   */
  checkLogin: function(callback) {
    var self = this;
    wx.request({
      url: API_URL + 'user/check_login?session_key=' + (wx.getStorageSync("session_key") || ""),
      success: function(res) {
        if (!res.data.nickname) {
          //让用户授权
          self.login(callback);
        } else {
          self.globalData.userInfo = {
            nickname: res.data.nickname,
            session_key: wx.getStorageSync("session_key")
          };
          if(callback) {
            callback();
          }
        }
      }
    })
  },
  /**
   * auth and login and register
   */
  login: function(callback) {
    var self = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          var code = res.code;
          // 获取用户信息
          wx.getSetting({
            success: res => {
              console.log("getSetting", res.authSetting['scope.userInfo']);
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: res => {
                    // 可以将 res 发送给后台解码出 unionId
                    self.globalData.userInfo = res.userInfo
                    //请求服务器 保存用户数据
                    wx.request({
                      url: API_URL + "user/login",
                      data: {
                        code: code || "",
                        rawData : res.rawData,
                        signature: res.signature,
                        encryptedData : res.encryptedData,
                        iv : res.iv
                      },
                      success: function(res) {
                        console.log(res);
                        if (res.data.session_key) {
                          //TODO 打开本地存储开关
                          wx.setStorageSync('session_key', res.data.session_key);
                          self.globalData.userInfo = {
                            nickname: res.data.nickname,
                            session_key: res.data.session_key
                          };

                          if (callback) {
                            callback();
                          }
                        }
                      }
                    })

                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    if (self.userInfoReadyCallback) {
                      self.userInfoReadyCallback(res)
                    }
                  }
                })
              } else {
                //中转到授权页
                wx.navigateTo({
                  url: '/pages/index/index',
                })
              }
            }
          })
        }
      }
    })
  },

})