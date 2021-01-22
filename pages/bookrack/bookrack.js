import api from '../../http/api'
Page({
  /**
   * 页面的初始数据
   */
  // 显示数据 还是差值表达式
  data: {
    show:true,
    arr:[],
    host:'https://statics.zhuishushenqi.com',
    
  },
  //去到帮助中心
  goHelp(){
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  // 常用方法
  go(){
    wx.showLoading({
      title: '加载中……',
    }),
    setTimeout(()=>{
      wx.hideLoading() //取消加载
    },2000)
  },
  goshow(){
    this.setData({
      show:false
    })
  },
  godel(){
    this.setData({
      show:true
    })
  },
   //点击删除效果后重新存后再渲染页面
  clear(e){
    // console.log(e);
    let index = e.currentTarget.dataset.index
    console.log(index);
    this.data.arr.splice(index,1)
    wx.setStorageSync('books', this.data.arr)
    this.onShow()
    if(this.data.arr.length === 0){ //解决剩一一本 数据清空 页面还在显示的情况
      this.setData({
        arr:[]
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //onLoad 等同于 mounted，但是只会执行一次 在这里发请求 
  onLoad: function (options) {
      // console.log('onLoad')

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  // 每次进入页面 都会执行
  onShow: function () {
    let arr = wx.getStorageSync('books')  //提取对应的书籍数据
    if(arr.length>0){
      this.setData({
        arr:arr
      })
    }
    console.log(this.data.arr); //取出 拿到我已经收藏的书籍
    
      
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  // 离开页面执行
  onHide: function () {
    // console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // 下拉刷新时执行,先在json文件里面配置下来刷新 
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //导航栏加载
    setTimeout(()=>{
      wx.hideNavigationBarLoading() //取消加载
    },2000)  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  // 上拉加载
  onReachBottom: function () {
    console.log('上拉加载中..')
    //发一次请求 把拿到的数据拼接在data里面
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})