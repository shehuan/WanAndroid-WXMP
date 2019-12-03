let api = require('../../utils/api.js')
let util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    password: '',
    password2: '',
    nameFocus: true,
    passwordFocus: false,
    passwordFocus2: false
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

  inputPassword2: function(event) {
    this.data.password2 = event.detail.value;
  },

  register: function() {
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
    if (this.data.password2.length == 0) {
      util.toast("请确认密码！");
      return;
    }
    if (this.data.password != this.data.password2) {
      util.toast("两次输入的密码不一致！");
      return;
    }

    let param = {
      username: this.data.name,
      password: this.data.password,
      repassword: this.data.password2
    }
    api.register(param)
      .then(data => {
        util.toast('注册成功~');

        setTimeout(() => {
          wx.navigateBack({})
        }, 1000)
      }).catch(data => {

      })
  },

  nameBindfocus: function() {
    this.setData({
      nameFocus: true,
      passwordFocus: false,
      passwordFocus2: false
    })
  },

  passwordBindfocus: function() {
    this.setData({
      nameFocus: false,
      passwordFocus: true,
      passwordFocus2: false,
    })
  },

  passwordBindfocus2: function() {
    this.setData({
      nameFocus: false,
      passwordFocus: false,
      passwordFocus2: true
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