// components/boy/boy.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classify:{type:Array},
    type:{type:String}
  },
  /**
   * 组件的初始数据
   */
  data: {
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    smallClassify(e){
    // console.log(e.currentTarget.dataset.type)
    // let item = e.currentTarget.dataset.item.name
      let obj={}
      obj.sex=e.currentTarget.dataset.type
      obj.name=e.currentTarget.dataset.item.name
      // console.log(obj)
      wx.navigateTo({
        url: `/pages/smallClassify/smallClassify?name=${JSON.stringify(obj)}`, //跳转到分类小分类  带返回
      })
    },
  }
})
