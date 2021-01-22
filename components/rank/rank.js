// components/rankboy/rankboy.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rank:{type:Array},
    type:{type:String},

  },

  /**
   * 组件的初始数据
   */
  data: {
    host:'https://statics.zhuishushenqi.com' ,//静态资源地址
    info:''
  },

  /**
   * 组件的方法列表
   */
  methods:{
    rankClass(e){
      // console.log(e)
      // console.log(e.currentTarget.dataset);
      let info = e.currentTarget.dataset.item
      this.setData({
        info : info
      })
      
      wx.navigateTo({
        url: `/pages/rankClass/rankClass?name=${JSON.stringify(info)}`, //跳转到排行分类  带返回
      })
    }
  }
})
