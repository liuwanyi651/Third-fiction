const { default: api } = require("../../http/api")

// pages/bookcity/bookcity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    male:'', //男生
    female:'',//女生
    press:'', //出版
    num:0,
    rankmale:'', //排行榜男生
    rankfemale:''
  },
  gored(){
    this.setData({
      num:0
    })
  },
  goRed(){
    this.setData({
      num:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '缓冲中',  //定义页面中间跳出 名为 缓冲中的提示
    })
    api.getCats().then((res)=>{  //获取大分类的接口
      // console.log(res)
     this.setData({  //赋值
      male:res.male,
      female:res.female,
      press:res.press
     })
      // console.log(this.data.male) //男生 
    }).catch((err)=>{
      console.log(err)
    })

    api.rankCategory().then((res)=>{ // 排名分类的接口
      // console.log(res) 
      this.setData({
        rankmale:res.male.splice(0,6),  //截取排行榜的男生前6个
        rankfemale:res.female.splice(0,6)
      })
      // console.log(this.data.rankmale) 
    })
    wx.hideLoading()
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