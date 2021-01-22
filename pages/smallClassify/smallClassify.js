import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [{ //定义装第一部分导航的数组
      id: 'hot',
      name: '热门'
    },
    {
      id: 'new',
      name: '新书'
    },
    {
      id: 'reputation',
      name: '好评'
    },
    {
      id: 'over',
      name: '完结'
    },
    {
      id: 'monthly',
      name: 'VIP'
    }
  ],
  arr:[], //定义装第二部分导航的数组
  flag:0, //打标记 动态绑定 
  flagTwo:0 ,
  gender:'',
  type:'', 
  major:'', 
  minor:'',
  start:0,
  arr1:[],
  host:'https://statics.zhuishushenqi.com',
  info:''
  },

  clickOne(e){
    //console.log(e);
    // console.log(e.currentTarget.dataset.index);
    let index = e.currentTarget.dataset.index
    // console.log( e.currentTarget.dataset.item);
    let id = e.currentTarget.dataset.item.id
    //  console.log(id);
    // let id = e.currentTarget.dataset.item.id
    this.setData({
     flag:index,
     type:id, 
       
    })
    // 发请求 
    api.getCatsBooks(this.data.gender,this.data.type,this.data.major,this.data.minor,this.data.start).then((res)=>{
      // console.log(res)
      this.setData({
        arr1:res.books
      })
      // console.log(this.data.arr1) 
    })

  },
  clickTwo(e){
    // console.log(e);
    let index = e.currentTarget.dataset.index
    let minor=e.currentTarget.dataset.item
    // console.log(minor)
    if(minor==='全部'){
      this.setData({
        minor:'',
        flagTwo:index
      })
    }else{
      this.setData({
        flagTwo:index,
        minor:minor,
      })
    }
    api.getCatsBooks(this.data.gender,this.data.type,this.data.major,this.data.minor,this.data.start).then((res)=>{
      this.setData({
        arr1:res.books
      })
      // console.log(this.data.arr1)    
    })
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
    //  console.log(options)
    wx.showLoading({
      title: '缓冲中',  //定义页面中间跳出 名为 缓冲中的提示
    })
    let major = JSON.parse(options.name)
    this.setData({
      major:major.name,
      gender:major.sex,
    })
    //console.log(major.name)
    let type =options.type
    //console.log(type)
    api.getMinor().then((res)=>{   //获取小类
    //console.log(res)
    res[major.sex].map(item=>{
    if(item.mins.length>0){
    item.mins.unshift('全部')
    }
    if(item.major===major.name){
    this.setData({
      arr:item.mins
    })
  }
})
      // 判断类型
      if( type === 'male'){
        // console.log(1111)
        let list = res.male
        // console.log(major)
        list.map((item)=>{
         if(major.name === item.major) {
           this.setData({
             arr:item.mins,
             major:item.major,
           })
         }
       })
      }
    })
    api.getCatsBooks(this.data.gender,this.data.type,this.data.major,this.data.minor,this.data.start).then((res)=>{
      this.setData({
        arr1:res.books
      })
      // console.log(this.data.arr1)  
      wx.hideLoading() //取消缓冲
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
    this.data.start +=20
    api.getCatsBooks(this.data.gender,this.data.type,this.data.major,'',this.data.start).then((res)=>{
      this.setData({
        arr1:this.data.arr1.concat(res.books)
      })
    })
    console.log(this.data.arr1);
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})