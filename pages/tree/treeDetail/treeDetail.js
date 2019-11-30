let api = require('../../../utils/api.js')
let util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperIndex: 0,
    categoryItems: [],
    scrollWidth: 0,
    articleList: [],
    categoryList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.name
    });
    let categoryList = JSON.parse(decodeURIComponent(options.categoryList));
    categoryList.forEach(item => {
      this.data.articleList.push({
        datas: [],
        curPage: 0,
      })
    });

    this.setData({
      categoryList: categoryList,
      articleList: this.data.articleList
    });

    this.getArticleList();
  },

  // 分类体系下的文章列表
  getArticleList: function() {
    let index = this.data.swiperIndex;
    let cid = this.data.categoryList[index].id;
    let curPage = this.data.articleList[index].curPage;
    api.treeDetail(curPage, {
      cid: cid
    }).then(data => {
      this.saveArticleList(index, data)
    })
  },

  saveArticleList: function(index, data) {
    this.data.articleList[index].datas.push(...data.datas);
    this.data.articleList[index].curPage = data.curPage;
    this.data.articleList[index].pageCount = data.pageCount;

    this.setData({
      articleList: this.data.articleList
    })
  },

  // 滑动切换swiper
  swiperChange: function(event) {
    let index = event.detail.current;
    let item = this.data.categoryItems[index];
    let distance = item.left - (this.data.scrollWidth / 2 - item.width / 2);

    this.setData({
      swiperIndex: index,
      scrollLeft: distance
    })

    if (this.data.articleList[index].datas.length > 0) {
      return;
    }

    this.getArticleList();
  },

  // 分页
  loadMore: function() {
    let index = this.data.swiperIndex;
    if (this.data.articleList[index].curPage < this.data.articleList[index].pageCount) {
      this.getArticleList();
    } else {
      util.toast('没有了哦~');
    }
  },

  // 点击tab切换swiper
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
    // 计算每个item测尺寸
    util.getItemSize('.item')
      .then(res => {
        res.forEach((item) => {
          this.data.categoryItems.push(item);
        })
      })

    // 计算分类滚动区域尺寸
    util.getScrollWidth('.category')
      .then(res => {
        this.data.scrollWidth = res;
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