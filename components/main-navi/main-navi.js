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
    left: -app.globalData.naviInfo.naviWidth
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toMine: function() {
      this.setData({
        left: 0
      })
    },
    toSearch: function() {
      wx.navigateTo({
        url: '/pages/search/search',
      })
    }
  }
})