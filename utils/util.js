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

// 显示toast
const toast = (title, icon = 'none') => {
  wx.showToast({
    title: title,
    icon: icon
  })
}

module.exports = {
  getItemSize: getItemSize,
  getScrollWidth: getScrollWidth,
  copyLink: copyLink,
  toast: toast
}