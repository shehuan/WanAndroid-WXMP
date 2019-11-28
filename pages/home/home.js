let api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperIndex: 0,
    pageNum: 0,
    articleList: {
      datas: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.getBanner();
    this.getArticleList();
  },

  // 顶部banner
  getBanner: function() {
    api.banner()
      .then(data => {
        this.setData({
          bannerList: data
        })
      });
  },

  // 文章列表
  getArticleList: function() {
    api.articleList(this.data.pageNum)
      .then(data => {
        this.data.articleList.datas.push(...data.datas);
        this.data.articleList.pageCount = data.pageCount;
        this.setData({
          articleList: this.data.articleList
        })
        wx.stopPullDownRefresh()
      }).catch(res => {
        wx.stopPullDownRefresh()
      })
  },

  swiperChange: function(event) {
    this.setData({
      swiperIndex: event.detail.current
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
    this.data.pageNum = 0;
    this.data.articleList.datas = [];
    this.getBanner();
    this.getArticleList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.pageNum < this.data.articleList.pageCount) {
      this.data.pageNum += 1;
      this.getArticleList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})