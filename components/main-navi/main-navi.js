// components/MainNavi.js
let app = getApp()
Component({
  /**
   * 组件的对外属性，是属性名到属性设置的映射表
   */
  properties: {
    title: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的内部数据，和 properties 一同用于组件的模板渲染
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
  },

  /**
   * 组件所在页面的生命周期声明对象
   */
  pageLifetimes: {
    // 页面被隐藏
    hide: function() {
      this.setData({
        left: -app.globalData.naviInfo.naviWidth
      })
    },
  }
})