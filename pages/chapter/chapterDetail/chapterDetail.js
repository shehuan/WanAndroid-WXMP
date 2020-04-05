let api = require('../../../utils/api.js')
let util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapterId: -1,
    articleList: {
      curPage: 1,
      datas: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.name
    });
    this.data.chapterId = options.id;

    this.getChapterArticleList();
  },

  // 公众号文章列表
  getChapterArticleList: function() {
    api.chapterArticleList(this.data.chapterId, this.data.articleList.curPage)
      .then(data => {
        this.data.articleList.curPage = data.curPage;
        this.data.articleList.pageCount = data.pageCount;
        this.data.articleList.datas.push(...data.datas);
        this.setData({
          articleList: this.data.articleList
        })
        wx.stopPullDownRefresh();
      }).catch(res => {
        wx.stopPullDownRefresh();
      })
  },

  toArticleDetail: function(event) {
    let link = event.currentTarget.dataset.link;
    util.copyLink(link);
  },

  // 收藏、取消收藏
  doCollect: function (event) {
    let id = event.currentTarget.dataset.id;
    let collect = event.currentTarget.dataset.collect;
    let index = event.currentTarget.dataset.index;
    let key = 'articleList.datas[' + index + '].collect';

    api.doCollect(id, collect)
      .then(data => {
        this.setData({
          [key]: !collect
        })
      }).catch(data => {

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
    this.data.articleList = {
      datas: [],
      curPage: 0,
    }
    this.getChapterArticleList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.articleList.curPage < this.data.articleList.pageCount) {
      this.getChapterArticleList();
    } else {
      util.toast('没有了哦~');
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})