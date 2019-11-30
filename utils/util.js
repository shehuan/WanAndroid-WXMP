const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 计算scroll-view中每个item的大小
const getItemSize = selector => {
  return new Promise((resolve, reject) => {
    let query = wx.createSelectorQuery();
    query.selectAll(selector).boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function(res) {
      resolve(res[0]);
    });
  })
}

// 计算scroll-view的滚动区域大小
const getScrollWidth = selector => {
  return new Promise((resolve, reject) => {
    let query = wx.createSelectorQuery();
    query.select('.category').boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function(res) {
      resolve(res[0].width);
    });
  })
}

// 复制文章链接
const copyLink = link => {
  wx.setClipboardData({
    data: link,
    success(res) {
      toast('链接已复制，去浏览器访问~');
    }
  })
}

const toast = (title, icon = 'none') => {
  wx.showToast({
    title: title,
    icon: icon
  })
}

module.exports = {
  formatTime: formatTime,
  getItemSize: getItemSize,
  getScrollWidth: getScrollWidth,
  copyLink: copyLink,
  toast: toast
}