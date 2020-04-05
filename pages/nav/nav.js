let api = require('../../utils/api.js')
let util = require('../../utils/util.js')
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectIndex: 0,
    naviData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    api.navi()
      .then(data => {
        this.data.naviData = data;
        let naviList = ['热门网站']
        data.forEach((item) => {
          naviList.push(item.name);
        })

        this.setData({
          naviList: naviList,
        })

        api.friend()
          .then(data => {
            let list = []
            data.forEach((item) => {
              list.push({
                link: item.link,
                title: item.name
              });
            })

            this.data.naviData.unshift({
              articles: list
            })

            this.setData({
              websites: this.data.naviData[0].articles
            })
          })
      })
  },

  leftClick: function(event) {
    let index = event.currentTarget.dataset.index;
    this.setData({
      selectIndex: index,
      websites: this.data.naviData[index].articles
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight - app.globalData.naviInfo.naviHeight
        })
      },
    })
  },

  toArticleDetail: function (event) {
    let link = event.currentTarget.dataset.link;
    util.copyLink(link);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})