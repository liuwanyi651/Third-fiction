const {
  default: api
} = require("../../http/api")

// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    books: '',
    flag: 0,
    host: 'https://statics.zhuishushenqi.com',
    content: '',
    hotWords: '',
    value: '',
    arras: []
  },
  //拿到搜索的关键字
  content: function (e) {
    this.setData({
      content: e.detail.value
    })
    if (e.detail.value.length === 0) {
      this.setData({
        flag: 0
      })
    }
  },
  // 回车事件 存值
  Search(e) {
    this.data.arras.push(this.data.content)
    this.setData({
      arras: Array.from(new Set(this.data.arras))
    })
    wx.setStorage({
      data: Array.from(new Set(this.data.arras)),
      key: 'value',
    })
    if (this.data.content !== '') { //判断输入框输入内容不为空时 
      api.bookSearch(this.data.content).then((res) => { //书籍搜索 (分类，书名，作者名)接口
        // console.log(res) //拿到含有关键字的书
        this.setData({
          books: res.books, //赋值
          flag: 1,
        })
      })
    } else {
      this.setData({
        flag: 0
      })
    }
  },
  //点击刷新 换一换 调下面的请求接口
  flush() {
    this.onLoad()
  },
  // 点击关键字热词去到 相关书籍的搜索页面
  goSearclass(e) {
    // console.log(e);
    this.setData({
      content: e.currentTarget.dataset.item.name
    })
    this.Search()
  },
  //点击x 清空内容并返回
  cancel(e) {
    if (this.data.content) {
      this.setData({
        content: '',
        flag: 0
      })
    }
  },
  //点击去到书籍的详情页面
  clickBook(e) {
    // console.log(e);
    let info = e.currentTarget.dataset.item
    this.setData({
      info: info
    })
    // console.log(this.data.info); //拿到对应书籍的id 和 内容
    wx.navigateTo({
      url: `/pages/bookDetails/bookDetails?name=${JSON.stringify(this.data.info)}` //跳转书籍详情  带返回
    })
  },
  // 清空 让数组为空
  clearHistory(){
    this.setData({
      arras:[]
    })
    wx.clearStorage() 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let arras = wx.getStorageSync('value')
    console.log(arras);
    if (arras.length > 0) {
      this.setData({
        arras: arras
      })
    }
    api.hotWord().then((res) => { //热词的请求接口
      // console.log(res);
      let arr = []
      let num = Math.floor(Math.random() * res.hotWords.length)
      let number = Math.floor(Math.random() * res.hotWords.length)
      // console.log(num);
      // console.log(number);
      res.hotWords.slice(num, number + num + 1).map((item) => {
        // console.log(number+num+1);
        let obj = {}
        let r = Math.floor(Math.random() * 256)
        let g = Math.floor(Math.random() * 256)
        let b = Math.floor(Math.random() * 256)
        let color = `rgb(${r},${g},${b})` //拼接变量
        obj.color = color //为对象obj添加color name属性
        obj.name = item
        arr.push(obj)
        // console.log(arr);
      })
      this.setData({
        hotWords: arr
      })
      // console.log(this.data.hotWords);
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})