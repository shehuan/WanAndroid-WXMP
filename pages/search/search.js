let api = require('../../utils/api.js')
let util = require('../../utils/util.js')

const KEY = 'queryHistoryList'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    queryList: {
      curPage: 0,
      datas: []
    },
    showQueryResult: false,
    queryHistoryList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHotkey();
    this.getQueryHistory();
  },

  // 热门搜索
  getHotkey: function() {
    api.hotkey()
      .then(data => {
        this.setData({
          hotkeyList: data
        })
      })
  },

  // 搜索结果
  getQueryList: function() {
    api.query(this.data.queryList.curPage, {
      k: this.data.content
    }).then(data => {
      this.data.queryList.curPage = data.curPage;
      this.data.queryList.pageCount = data.pageCount;
      this.data.queryList.datas.push(...data.datas);
      if (this.data.queryList.datas.length == 0) {
        util.toast('未找到相关内容~');
      }
      this.setData({
        showQueryResult: true,
        queryList: this.data.queryList
      })
    });

    this.saveQueryHistory();
  },

  // 取出搜索记录
  getQueryHistory: function() {
    let that = this;
    wx.getStorage({
      key: KEY,
      success: function(res) {
        that.setData({
          queryHistoryList: res.data
        })
      },
    })
  },

  // 监听文本框输入
  inputChange: function(evenet) {
    this.setData({
      content: evenet.detail.value
    })
  },

  // 调用键盘搜索
  confirmSearch: function() {
    if (this.data.content.length == 0) {
      util.toast('请输入关键字！');
      return;
    }
    this.data.queryList = {
      curPage: 0,
      datas: []
    }
    this.getQueryList();
  },

  itemClick: function(event) {
    this.setData({
      content: event.currentTarget.dataset.content,
      queryList: {
        curPage: 0,
        datas: []
      }
    });
    this.getQueryList();

  },

  // 保存搜索记录
  saveQueryHistory: function() {
    let content = this.data.content;
    let queryHistoryList = this.data.queryHistoryList;
    queryHistoryList.forEach(function(e, i, array) {
      if (e == content) {
        queryHistoryList.remove(i);
      }
    });

    queryHistoryList.unshift(content);
    if (queryHistoryList.length > 20) {
      queryHistoryList = queryHistoryList.slice(0, 20);
    }
    this.setData({
      queryHistoryList: queryHistoryList
    })
    wx.setStorage({
      key: KEY,
      data: queryHistoryList,
      success: function(res) {

      }
    })
  },

  // 清空搜索记录
  clearQueryHistory: function() {
    let that = this;
    wx.removeStorage({
      key: KEY,
      success: function(res) {
        that.setData({
          queryHistoryList: []
        })
      },
    })
  },

  // 取消搜索
  cancel: function() {
    this.setData({
      showQueryResult: false
    })
  },

  // 删除输入的内容
  deleteContent: function() {
    this.setData({
      content: ''
    })
  },

  toArticleDetail: function(event) {
    let link = event.currentTarget.dataset.link;
    util.copyLink(link);
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
    if (this.data.queryList.curPage < this.data.queryList.pageCount) {
      this.getQueryList();
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