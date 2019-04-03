// components/ques/ques.js
const app = getApp();
const APIURL = app.globalData.apiurl;

var timerObj = null;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    roomId: {
      type: String,
      value: ""
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    m: 0,
    s: 0,
    riddleType: "timer",
    riddleText: "",
  },

  created: function () {
    this.getRiddle();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取谜语
    getRiddle: function() {
      var self = this;
      //请求系统，下一场开始的剩余时间
      wx.request({
        url: APIURL + '/riddle/get',
        data: {
          "type": self.data.riddleType,
          "roomId": self.data.roomId,
        },
        success: function (res) {
          let liveTimes = res.data.liveTimers || 0;
          console.log("liveTimes", liveTimes, res.data)

          //计时
          if (liveTimes > 0) {
            timerObj = setInterval(function () {
              self.timerTick(liveTimes);
              liveTimes--;
            }, 1000)
            console.log("timerObj", timerObj);
          } else {
            //显示谜语
            let riddle = res.data.riddle;
            if (!riddle) {
              return;
            }
            self.setData({
              riddleText: riddle.title || "服务器返回不确定的谜语~~~!~!"
            });
          }
        }
      })
    },
    //计时器
    timerTick: function(times) {
      console.log(times);
      if (times <= 0) {
        this.setData({
          s: 0,
          m: 0,
          riddleType: ""
        });
        clearInterval(timerObj);
        this.getRiddle();
        return;
      }

      let s = times % 60;
      let m = parseInt(times / 60)
      s = (s + "").length == 1 ? "0" + s : s;
      m = (m + "").length == 1 ? "0" + m : m;
      this.setData({
        s: s,
        m: m,
      });
    },
  }
})
