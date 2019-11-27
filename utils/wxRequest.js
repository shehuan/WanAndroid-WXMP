let app = getApp();

function request(method, url, param, isShowLoading) {
  //返回一个Promise对象
  return new Promise(function(resolve, reject) {
    if (isShowLoading) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      });
    }
    wx.request({
      url: url,
      method: method,
      data: param,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function(res) {
        console.log('接口：' + url, ' 参数：', param, '\n返回值：', res.data)
        if (isShowLoading) {
          wx.hideLoading();
        }
        if (res.data.errorCode == '0') { // 接口正常返回
          resolve(res.data);
        } else { // 出现异常
          wx.showToast({
            title: res.data.errorMsg,
            icon: 'none',
            duration: 2000
          });
          reject(res.data);
        }
      },
      fail: function(res) {
        wx.hideLoading();
        wx.showToast({
          title: '服务连接异常',
          icon: 'none',
          duration: 2000
        });
      }
    });
  });
}

// get请求
function get(path, param = {}, isShowLoading = true) {
  return request("GET", app.globalData.baseurl + path, param, isShowLoading);
}

// post请求
function post(path, param = {}, isShowLoading = true) {
  return request("POST", app.globalData.baseurl + path, param, isShowLoading);
}

module.exports = {
  get: get,
  post: post
}