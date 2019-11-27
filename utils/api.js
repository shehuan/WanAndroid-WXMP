const wxRequest = require('/wxRequest.js');

// 登录
let login = (param) => wxRequest.post('/user/login', param);

// 注册
let register = (param) => wxRequest.post('/user/register', param);

// 退出
let logout = () => wxRequest.get('/user/logout/json');

// 首页banner
let banner = () => wxRequest.get('/banner/json');

// 常用网站
let friend = () => wxRequest.get('/friend/json');

// 首页文章列表
let articleList = (pageNum) => wxRequest.get(`/article/list/${pageNum}/json`);

// 热词（目前搜索最多的关键词）
let hotkey = () => wxRequest.get('/hotkey/json');

// 搜索（支持多个关键词，用空格隔开）
let query = (pageNum, param) => wxRequest.post(`/article/query/${pageNum}/json`, param);

// 体系结构
let tree = () => wxRequest.get('/tree/json');

// 体系下的文章
let treeDetail = (pageNum, param) => wxRequest.get(`/article/list/${pageNum}/json`);

// 最新项目
let newProject = (pageNum) => wxRequest.get(`/article/listproject/${pageNum}/json`);

// 项目分类
let projectCategory = () => wxRequest.get('/project/tree/json');

// 项目分类详情列表
let projectDetail = (pageNum, param) => wxRequest.get(`/project/list/${pageNum}/json`, param);

// 导航
let navi = () => wxRequest.get('/navi/json');

// 微信公众号列表
let chapter = () => wxRequest.get('/wxarticle/chapters/json');

// 微信公众号文章列表/搜索
let chapterArticleList = (chapterId, pageNum, param) => wxRequest.get(`/wxarticle/list/${chapterId}/${pageNum}/json`);

// 收藏文章列表
let collectArticleList = (pageNum) => wxRequest.get(`/lg/collect/list/${pageNum}/json`);

// 收藏站内文章
let collectArticle = (id) => wxRequest.post(`/lg/collect/${id}/json`)

// 在文章列表取消收藏
let uncollectArticle = (id) => wxRequest.post(`/lg/uncollect_originId/${id}/json`)

// 在收藏列表取消收藏
let cancelMyCollection = (id) => wxRequest.post(`/lg/uncollect/${id}/json`)

module.exports = {
  login,
  register,
  logout,
  banner,
  friend,
  articleList,
  hotkey,
  query,
  tree,
  treeDetail,
  newProject,
  projectCategory,
  projectDetail,
  navi,
  chapter,
  chapterArticleList,
  collectArticleList,
  collectArticle,
  uncollectArticle,
  cancelMyCollection
}