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
    this.getTreeList();
  },

  getTreeList: function() {
    api.tree()
      .then(data => {
        this.setData({
          treeList: data
        });
        wx.stopPullDownRefresh();
      }).catch(res => {
        wx.stopPullDownRefresh();
      })
  },

  toTreeDetail: function(event) {
    let children = event.currentTarget.dataset.children;
    let name = event.currentTarget.dataset.name;
    let categoryList = [];
    children.forEach(item => {
      categoryList.push({
        id: item.id,
        name: item.name
      })
    })
    wx.navigateTo({
      url: '/pages/tree/treeDetail/treeDetail?categoryList=' + encodeURIComponent(JSON.stringify(categoryList)) + '&name=' + name
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
      this.getTreeList();
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