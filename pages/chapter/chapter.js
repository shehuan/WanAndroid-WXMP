let api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getChapterList();
  },

  getChapterList: function() {
    api.chapter()
      .then(data => {
        this.setData({
          chapterList: data
        });
        wx.stopPullDownRefresh();
      }).catch(res => {
        wx.stopPullDownRefresh();
      })
  },

  toChapterDetail: function(event) {
    let id = event.currentTarget.dataset.id;
    let name = event.currentTarget.dataset.name;
    wx.navigateTo({
      url: '/pages/chapter/chapterDetail/chapterDetail?id=' + id + '&name=' + name
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
    this.getChapterList();
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