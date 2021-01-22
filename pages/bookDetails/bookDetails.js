const {
  default: api
} = require("../../http/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0, //打标记动态绑定
    host: 'https://statics.zhuishushenqi.com',
    list: {}, //书籍详情
    books: [],
    booktitle: '',
    obj: {},
    show: false,
    star:0,
    stara:0
  },
  goDetail() {
    this.setData({
      num: 0
    })
  },
  goRemark() {
    this.setData({
      num: 1
    })
  },
  // 加入书架
  addBookcase() {
    console.log(this.data.list);
    this.setData({
      show: true
    })
    if (wx.getStorageSync('books').length > 0) {
      let books = wx.getStorageSync('books')
      books.push(this.data.list)
      wx.setStorage({
        data: books,
        key: 'books',
      })
      console.log(books);
    }else{
      let arr = []
      arr.push(this.data.list)
      wx.setStorage({
        data: arr,
        key: 'books',
      })
    }
  },
  // 随机  换一换
  flush() {
    api.recommend(this.data.obj._id).then((res) => { // 相关推荐
      // console.log(res); //拿到20本书
      let number = Math.floor(Math.random() * (res.books.length - 3))
      // console.log(number); //生成的随机数字
      // console.log(res.books.length-3);

      this.setData({
        books: res.books.slice(number, number + 3)
      })
      // console.log(this.data.books)
    })
  },
  // 点击去到书籍的详情页面
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    wx.showLoading({
      title: '缓冲中', //定义页面中间跳出 名为 缓冲中的提示
    })
    this.data.obj = JSON.parse(options.name)
    // console.log(this.data.obj);  //拿里面的 _id 等

    api.bookInfo(this.data.obj._id).then((res) => { // 书籍详情
      // console.log(res);
      this.setData({
        list: res,
        star:Math.floor((res.rating.score)/2),
        stara:5-Math.floor((res.rating.score)/2)
      })
      // console.log(this.data.list);
    })

    api.recommend(this.data.obj._id).then((res) => { // 相关推荐
      // console.log(res); //拿到20本书
      this.setData({
        books: res.books.slice(0, 3),
      })
      // console.log(this.data.books)
      wx.hideLoading()
    })

    api.shortReviews(this.data.obj._id).then((res) => { //短评价
      // console.log(res);
      this.setData({
        docs: res.docs
      })
      // console.log(this.data.docs);   //拿到每条评论的数据
    })
    //循环 如果加入书籍_id 与  接口请求的 _id 相同 点进去也是已加入
    let books = wx.getStorageSync('books')
    if (books.length > 0) {
      books.map((item) => {
        if (item._id === this.data.obj._id) {
          this.setData({
            show: true
          })
        }
      })
    }
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