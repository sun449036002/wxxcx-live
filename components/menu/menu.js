// components/menu/menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    curMenu: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    menuList: [
      {
        title: "首页",
        name: "home",
        url: "/pages/main/main"
      },
      {
        title: "我的",
        name: "my",
        url: "/pages/my/my"
      },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {



  }
})