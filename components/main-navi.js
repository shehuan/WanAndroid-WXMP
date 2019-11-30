// components/MainNavi.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    naviInfo: app.globalData.naviInfo,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toMine: function() {
      console.log(123)
    },
    toSearch: function() {
      console.log(111)
    }
  }
})