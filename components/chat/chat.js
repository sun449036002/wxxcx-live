// components/chat/chat.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    roomId: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    chatList: [],
    msg: "",
    isSocketOpen: false,
    scrollTop: 0
  },

  ready: function(res) {
    this.init();
  },

  /**
   * 组件的方法列表
   * 
   */
  methods: {
    init: function(res) {
      console.log(app.globalData);
      var self = this;
      setTimeout(function() {
        wx.connectSocket({
          url: 'wss://talk.sun.zj.cn/wss?roomId=' + (self.data.roomId || "") + "&sessionKey=" + app.globalData.userInfo.session_key,
          data: {
            roomId: self.data.roomId || "",
            sessionKey: "" //app.globalData.userInfo.sessionKey || ""
          }
        });
      }, 500);

      wx.onSocketOpen(function(res) {
        console.log('WebSocket连接已打开！');
        self.setData({
          isSocketOpen: true
        })
      });
      wx.onSocketError(function(res) {
        console.log('WebSocket连接打开失败，请检查！')
      });
      wx.onSocketMessage(function(res) {
        console.log('收到服务器内容：' + res.data);
        var data = JSON.parse(res.data);
        console.log("转换成JSON 对象：", data);
        self.setData({
          chatList: self.data.chatList.concat(data),
          scrollTop: (self.data.chatList.length) * 1000
        })

      });
      wx.onSocketClose(function(res) {
        console.log('WebSocket 已关闭！')
      })

    },
    /**
     * 输入聊天内容
     */
    chatInputChange: function(e) {
      this.setData({
        msg: e.detail.value
      })
    },
    /**
     * 发送消息
     */
    sendMsg: function(e) {
      var self = this;
      if (!this.data.isSocketOpen) {
        wx.showToast({
          title: "Socket 未找开"
        });
        return;
      }
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