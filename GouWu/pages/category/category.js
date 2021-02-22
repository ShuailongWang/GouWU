
//引入请求
import { request } from "../../request/index.js";

// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //分类数据
    categoryTableList : [],
    //左侧数据
    leftTableList : [],
    //右侧数据
    rightTableList : [],
    //点击左侧
    currnetIndex : 0,
    //右侧，回到顶部
    rightTopMagrin : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
      根据本地缓存，来判断是否请求数据
    */ 
   const Cates = wx.getStorageSync('catesListKey')
   if (Cates) {  
    //判断是否过期，5分钟
    if (Date.now() - Cates.time > 1000*60*5){
      console.log("重新请求")
      //获取分类列表
      this.getCategoryList();
    } else {
      console.log("本地数据")
      this.categoryTableList = Cates.data
      //数据赋值
      this.setCategoryTableData();
    }
   } else {
    //不存在，发送请求
    console.log("重新请求001")
    //获取分类列表
    this.getCategoryList();
   }
  },

  //获取分类列表
  getCategoryList(){
    request({"url":"https://api-hmugo-web.itheima.net/api/public/v1/categories"})
    .then(result => {
      console.log(result);
      //分类数据
      this.categoryTableList = result.data.message

      //保存数据到本地
      wx.setStorageSync('catesListKey', {time:Date.now(), data:this.categoryTableList});
      
      //数据赋值
      this.setCategoryTableData();
    })
    .catch(error => {
      console.log(error);
    })
  },

  //数据赋值
  setCategoryTableData(){
      //左侧数据, 拿到标题
      let leftTableList = this.categoryTableList.map(v=>v.cat_name);
      //右侧数据
      let rightTableList = this.categoryTableList[0].children;

      this.setData({
        leftTableList,
        rightTableList
      })
  },

  //点击事件
  clickLeftMenu(e){
    //console.log(e);
    //索引
    const index = e.currentTarget.dataset.index;
    //根据索引获取右侧数据
    let rightTableList = this.categoryTableList[index].children;
    //赋值
    this.setData({
      currnetIndex:index,
      rightTableList,
      rightTopMagrin:0  //重新设置右侧，回到顶部
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