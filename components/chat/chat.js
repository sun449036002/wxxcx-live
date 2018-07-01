// components/chat/chat.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    roomId : {
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    chatList:[],
    msg : "",
    isSocketOpen : false,
  },

  ready : function(res) {
    this.init();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init:function(res) {
      var self = this;
      console.log(self.data);
      return;
      wx.connectSocket({
        url: 'wss://talk.sun.zj.cn/wss',
        data : {
          roomId: self.data.roomId || "",
          sessionKey: self.globalData.userinfo.sessionKey || ""
        }
      });
      wx.onSocketOpen(function (res) {
        console.log('WebSocket连接已打开！');
        self.setData({
          isSocketOpen : true
        })
      });
      wx.onSocketError(function (res) {
        console.log('WebSocket连接打开失败，请检查！')
      });
      wx.onSocketMessage(function (res) {
        console.log('收到服务器内容：' + res.data)
      });
      wx.onSocketClose(function (res) {
        console.log('WebSocket 已关闭！')
      })
      
    },
    /**
     * 输入聊天内容
     */
    chatInputChange : function(e) {
      this.setData({
        msg : e.detail.value
      })
    },
    /**
     * 发送消息
     */
    sendMsg : function(e) {
      var self = this;
      if(!this.data.isSocketOpen) {
        wx.showTabBar("Socket未打开");
        return;
      }
      wx.sendSocketMessage({
        data: self.data.msg,
        complete : function(res) {
          console.log(res);
        }
      });
      this.setData({
        msg : ""
      })
    }
  }
})
