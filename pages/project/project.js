let api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperIndex: 0,
    categoryItems: [],
    scrollWidth: 0,
    projectList: [],
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
        data.forEach((item, index) => {
          this.data.projectList[index] = {
            datas: [],
            curPage: 0,
          }
        })
        this.setData({
          categoryList: data,
          projectList: this.data.projectList
        });
        this.getProjectList();
        this.onReady()
      })
  },

  // 项目列表
  getProjectList: function() {
    let index = this.data.swiperIndex;
    let cid = this.data.categoryList[index].id;
    let curPage = this.data.projectList[index].curPage;
    api.projectDetail(curPage + 1, {
      cid: cid
    }).then(data => {
      this.data.projectList[index].datas.push(...data.datas);
      this.data.projectList[index].curPage = data.curPage;
      this.data.projectList[index].pageCount = data.pageCount;

      let key = 'projectList[' + index + ']'
      console.log(this.data.projectList[index])
      this.setData({
        projectList: this.data.projectList
      })
    })
  },

  swiperChange: function(event) {
    let index = event.detail.current;
    let item = this.data.categoryItems[index];
    let distance = item.left - (this.data.scrollWidth / 2 - item.width / 2);

    this.setData({
      swiperIndex: index,
      scrollLeft: distance
    })

    this.getProjectList();
  },

  tabCahnge: function(event) {
    let index = event.currentTarget.dataset.index;
    this.setData({
      swiperIndex: index
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let that = this;

    let query = wx.createSelectorQuery();
    query.selectAll('.item').boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function(res) {
      res[0].forEach((item) => {
        that.data.categoryItems.push(item);
      })
    });

    let query2 = wx.createSelectorQuery();
    query2.select('.category').boundingClientRect();
    query2.selectViewport().scrollOffset();
    query2.exec(function(res) {
      that.data.scrollWidth = res[0].width;
    });

  },

  loadMore: function() {
    let index = this.data.swiperIndex;
    if (this.data.projectList[index].curPage < this.data.projectList[index].pageCount) {
      this.getProjectList()
    } else {

    }
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