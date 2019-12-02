//app.js

App({
  onLaunch: function() {
    this.getNaviInfo();

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