let api = require('../../utils/api.js')
let util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  inputName: function(event) {
    this.data.name = event.detail.value;
  },

  inputPassword: function(event) {
    this.data.password = event.detail.value;
  },

  login: function() {
    if (this.data.name.length == 0) {
      util.toast("请输入用户名！");
      return;
    }
    if (this.data.name.length < 3) {
      util.toast("请输入至少3位用户名！");
      return;
    }
    if (this.data.password.length == 0) {
      util.toast("请输入密码！");
      return;
    }
    if (this.data.password.length < 6) {
      util.toast("请输入至少6位密码！");
      return;
    }

    let param = {
      username: this.data.name,
      password: this.data.password
    }
    api.login(param)
      .then(data => {
        util.toast('登录成功~');

        let eventChannel = this.getOpenerEventChannel();
        eventChannel.emit('loginSuccess', {
          data: this.data.name
        });

        wx.setStorage({
          key: 'name',
          data: this.data.name,
        })

        setTimeout(() => {
          wx.navigateBack({})
        }, 1000)
      }).catch(data => {

      })
  },

  register: function() {
    wx.navigateTo({
      url: '/pages/register/register',
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})