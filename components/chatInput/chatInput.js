// components/chatInput/chatInput.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    msg : ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 输入聊天内容
     */
    chatInputChange: function (e) {
      this.setData({
        msg: e.detail.value
      })
    },
    /**
     * 发送消息
     */
    sendMsg: function(e) {
      var self = this;      
      if (self.data.msg.length == 0) {
        wx.showToast({
          title: "内容不得为空"
        });
        return;
      }
      wx.sendSocketMessage({
        data: JSON.stringify({
          Val: self.data.msg,
          Sk: app.globalData.userInfo.session_key
        }),
        complete: function(res) {
          console.log(res);
        },
        fail: function(res) {
          console.log("send socket message fail:", res)
        }
      });
      this.setData({
        msg: ""
      })
    }
  }
})