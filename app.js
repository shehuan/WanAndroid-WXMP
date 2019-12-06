//app.js

App({
  onLaunch: function() {
    this.getNaviInfo();
	this.checkUpdate();

    Array.prototype.remove = function(from, to) {
      var rest = this.slice((to || from) + 1 || this.length);
      this.length = from < 0 ? this.length + from : from;
      return this.push.apply(this, rest);
    };
  },

  // 获取菜单按钮（右上角胶囊按钮）的布局位置信息
  getNaviInfo: function() {
    let menuRect = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: (res) => {
        let naviInfo = this.globalData.naviInfo;
        naviInfo.naviHeight = res.statusBarHeight + menuRect.height + (menuRect.top - res.statusBarHeight) * 2;
        naviInfo.naviWidth = res.windowWidth;
        naviInfo.menuTop = menuRect.top;
        naviInfo.menuHeight = menuRect.height;
        naviInfo.menuWidth = menuRect.width;
        naviInfo.menuRight = res.width - menuRect.width - menuRect.left;
        naviInfo.statusBarHeight = res.statusBarHeight;
      },
    })
  },
  
  // 检查更新
  checkUpdate: function () {
    if (wx.canIUse('getUpdateManager')) {
      let updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            wx.showModal({
              title: '已经有新版本了',
              content: '新版本已经上线，请您删除当前小程序，重新搜索打开'
            })
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  globalData: {
    baseurl: 'https://www.wanandroid.com',
    naviInfo: {
      naviHeight: 0,
      naviWidth: 0,
      menuTop: 0,
      menuHeight: 0,
      menuWidth: 0,
      menuRight: 0,
      statusBarHeight: 0,
    },
  },
})