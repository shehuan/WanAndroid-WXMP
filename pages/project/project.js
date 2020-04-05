let api = require('../../utils/api.js')
let util = require('../../utils/util.js')

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
        data.unshift({
          name: '最新项目'
        });
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
        this.getNewProjectList();
        this.onReady();
      })
  },

  // 最新项目列表
  getNewProjectList: function() {
    let curPage = this.data.projectList[0].curPage;
    api.newProject(curPage)
      .then(data => {
        this.saveProjectList(0, data)
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
      this.saveProjectList(index, data)
    })
  },

  saveProjectList: function(index, data) {
    this.data.projectList[index].datas.push(...data.datas);
    this.data.projectList[index].curPage = data.curPage;
    this.data.projectList[index].pageCount = data.pageCount;
    let key = 'projectList[' + index + ']';

    this.setData({
      [key]: this.data.projectList[index]
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

    if (this.data.projectList[index].datas.length > 0) {
      return;
    }

    if (index == 0) {
      this.getNewProjectList();
    } else {
      this.getProjectList();
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

  // 分页
  loadMore: function() {
    let index = this.data.swiperIndex;
    if (this.data.projectList[index].curPage < this.data.projectList[index].pageCount) {
      if (index == 0) {
        this.getNewProjectList();
      } else {
        this.getProjectList();
      }
    } else {
      util.toast('没有了哦~');
    }
  },

  toArticleDetail: function(event) {
    let link = event.currentTarget.dataset.link;
    util.copyLink(link);
  },

  // 收藏、取消收藏
  doCollect: function(event) {
    let id = event.currentTarget.dataset.id;
    let collect = event.currentTarget.dataset.collect;
    let index = event.currentTarget.dataset.index;
    let key = 'projectList[' + this.data.swiperIndex + '].datas[' + index + '].collect';

    api.doCollect(id, collect)
      .then(data => {
        this.setData({
          [key]: !collect
        })
      }).catch(data => {

      })
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