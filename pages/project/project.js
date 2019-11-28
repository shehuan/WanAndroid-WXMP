let api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getProjectCategory();
  },

  //项目分类
  getProjectCategory: function() {
    api.projectCategory()
      .then(data => {
        // let list = data.unshift({
        //   name: '最新项目'
        // });
        this.setData({
          categoryList: data
        })
      })
  },

  swiperChange: function(event) {
    this.setData({
      swiperIndex: event.detail.current
    })
    console.log(event.detail.current)

    // let that = this;
    // let index = e.detail.current;
    // let left_distance = that.data.left_distance;
    // let id = left_distance[index].id,
    //   item_left = left_distance[index].left,
    //   item_width = left_distance[index].width,
    //   scrollWidth = that.data.scrollWidth;
    // let distance = item_left - (scrollWidth / 2 - item_width / 2);
    // that.setData({
    //   shop_classify_index: index,
    //   scroll_left: distance
    // });
  },

  tabCahnge: function(event) {
    console.log(event)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // let that = this,
    //   left_distance = [];
    // util.getDom('.shop_classify_list')
    //   .then((rect) => {
    //     rect.forEach((item) => {
    //       left_distance.push(item);
    //     });
    //     return Promise.resolve(rect);
    //   })
    //   .then((rect) => {
    //     util.getDom('#scroll_view')
    //       .then((rect) => {

    //         that.setData({
    //           scrollWidth: rect && rect.length <= 0 ? 0 : rect[0].width,
    //           left_distance: left_distance
    //         });
    //       });
    //   });
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