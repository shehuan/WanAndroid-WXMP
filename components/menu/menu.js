// components/menu/menu.js
let util = require('../../utils/util.js')
let api = require('../../utils/api.js')
let app = getApp()
Component({
  /**
   * 组件的对外属性，是属性名到属性设置的映射表
   */
  properties: {
    left: {
      type: Number,
      value: 0
    },
  },

  /**
   * 组件的内部数据，和 properties 一同用于组件的模板渲染
   */
  data: {
    naviInfo: app.globalData.naviInfo,
    name: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closeMenu: function() {
      this.setData({
        left: -app.globalData.naviInfo.naviWidth
      })
    },

    login: function() {
      if (this.data.name != '登录') {
        return;
      }
      let that = this;
      wx.navigateTo({
        url: '/pages/login/login',
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          loginSuccess: function(data) {
            that.setData({
              name: data.data
            })
          }
        },
      })
    },

    toCollection: function() {
      if (this.data.name == '登录') {
        util.toast('请先登录！')
        return;
      }
      wx.navigateTo({
        url: '/pages/collection/collection',
      })
    },

    toLogout: function() {
      if (this.data.name == '登录') {
        util.toast('请先登录！')
        return;
      }
      let that = this;
      wx.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success(res) {
          if (res.confirm) {
            api.logout()
              .then(data => {
                util.toast('退出成功~')
                that.setData({
                  name: '登录'
                });
                wx.clearStorage();
              }).catch(data => {

              })
          } else if (res.cancel) {

          }
        }
      })
    },

    toSetting: function() {
      util.toast('todo~')
    },

    toAbout: function() {
      util.toast('todo~')
    },
  },

  /**
   * 组件生命周期函数-在组件实例进入页面节点树时执行
   */
  attached: function() {
    // let name = wx.getStorageSync('name');
    // if (!name) {
    //   name = '登录';
    // }
    // this.setData({
    //   name: name
    // })
  },

  /**
   * 组件所在页面的生命周期声明对象
   */
  pageLifetimes: {
    // 页面被展示
    // 在其它menu中登录后，需要刷新当前menu
    show: function() {
      let name = wx.getStorageSync('name');
      if (!name) {
        name = '登录';
      }
      this.setData({
        name: name
      })
    },
  }
})