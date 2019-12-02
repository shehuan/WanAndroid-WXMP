let api = require('../../utils/api.js')
let util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionList: {
      curPage: 0,
      datas: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCollectionList();
  },

  getCollectionList: function() {
    api.collectArticleList(0)
      .then(data => {
        this.data.collectionList.curPage = data.curPage;
        this.data.collectionList.pageCount = data.pageCount;
        this.data.collectionList.datas.push(...data.datas);
        this.setData({
          collectionList: this.data.collectionList
        })
      })
  },

  toArticleDetail: function(event) {
    let link = event.currentTarget.dataset.link;
    util.copyLink(link);
  },

  cancelCollect: function(event) {
    let originId = event.currentTarget.dataset.originid;
    let id = event.currentTarget.dataset.id;
    let index = event.currentTarget.dataset.index;
    api.cancelMyCollection(id, {
        originId: originId
      })
      .then(data => {
        util.toast('已取消收藏~');
        this.data.collectionList.datas.remove(index);
        this.setData({
          collectionList: this.data.collectionList
        })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.collectionList.curPage < this.data.collectionList.pageCount) {
      this.getCollectionList();
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