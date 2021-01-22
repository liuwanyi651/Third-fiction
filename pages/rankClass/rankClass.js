const { default: api } = require("../../http/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender:'',
    title:'',
    obj:{},
    num:'1',
    arr1:[],
    arr2:[],
    arr3:[],
    host:'https://statics.zhuishushenqi.com',
  },
  goOne(e){
    this.setData({
      num : e.currentTarget.dataset.index //动态绑定class 传data-index 
    })
  },
  // 点击月榜事件
  clickMonth(){
    wx.showLoading({
      title: '缓冲中',  //定义页面中间跳出 名为 缓冲中的提示
    })
    // console.log(this.data.obj.monthRank)
    if(this.data.obj.monthRank !== undefined){
      api.rankInfo(this.data.obj.monthRank).then((res)=>{ // 排名详情 //月榜的请求
        // console.log(res);
        this.setData({
          arr2:res.ranking.books
        })
        // console.log(this.data.arr2);
        wx.hideLoading()
      })
    }
  },
  // 点击总榜事件
  clickTotal(){
    wx.showLoading({
      title: '缓冲中',  //定义页面中间跳出 名为 缓冲中的提示
    })
    if(this.data.obj.totalRank !== undefined){
      api.rankInfo(this.data.obj.totalRank).then((res)=>{ // 排名详情 总榜的请求
        // console.log(res);
        this.setData({
          arr3:res.ranking.books
        })
        // console.log(this.data.arr3);
        wx.hideLoading()
      })
    }
  },
  // 点击去到书籍的详情页面
  clickBook(e){
    // console.log(e);
    let info = e.currentTarget.dataset.item
    this.setData({
      info:info
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
    // console.log(options)
    wx.showLoading({
      title: '缓冲中',  //定义页面中间跳出 名为 缓冲中的提示
    })
    this.data.obj = JSON.parse(options.name)
    this.setData({
      obj:JSON.parse(options.name)
    })
    // console.log(this.data.obj);
   
    wx.setNavigationBarTitle({  //接收由 paihang.js 中传过来的标题参数 用来在标签栏对应名字
      title: this.data.obj.title
    })
    //总榜: totalRank 月榜： monthRank 周榜:  _id

    //周榜的请求
    api.rankInfo(this.data.obj._id).then((res)=>{ // 排名详情
      // console.log(res);
      this.setData({
        arr1:res.ranking.books
      })
      // console.log(this.data.arr1);
      wx.hideLoading()
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