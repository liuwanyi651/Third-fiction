// pages/bookshelf/bookshelf.js
// import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:0,
    arr: [],
    arr2: [],
    dex:-1,
    hav:0,
    animation: {},
  },
  //桌面刷新
  gio(){
    this.onShow()
  },
  //编辑的时候
  delete(){
    this.setData({
      flag:1,
    })
     // 1: 创建动画实例animation:
  var animation = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease',
   })
   this.animation = animation
   var next = true;
   //连续动画关键步骤
   setInterval(function () {
    //2: 调用动画实例方法来描述动画
    if (next) { 
    animation.rotate(2).step()
    animation.translateX(2).step();
     next = !next;
    } else {
     animation.rotate(-2).step()
     animation.translateX(-2).step();
     next = !next;
    }
    //3: 将动画export导出，把动画数据传递组件animation的属性 
    this.setData({
     animation: animation.export()
    })
   }.bind(this), 300)
  },

  //完成编辑后
  bank(){
    this.setData({
      flag:0,
    })
  },

  //帮助
  clickhelp() {
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  //点击删除效果后重新存后再渲染页面
  clear(e){
    this.setData({
      dex:e.currentTarget.dataset.index
    })
    this.data.arr.splice(this.data.dex,1)
    wx.setStorageSync('bookshelf', this.data.arr)
    this.onShow()
  },

  //方法得到最开始存在后台的数据
  give(){
    this.data.hav=0,
    this.setData({
      arr: wx.getStorageSync('bookshelf') || []
    })
    //判断存的数据是否为空
      if(this.data.arr.length!=0){
      this.setData({
        hav:1,
      })
    }else{
      //为空的时候显示的页面和图标
      this.setData({
        hav:0,
        flag:0,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //进入页面就调用一次方法来渲染进入第一次页面的数据
    this.give()
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
    //调用来渲染每次删除或者添加后的新数据
    this.give()
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