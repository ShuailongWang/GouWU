// pages/search/search.js

import {request} from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchTableList : [],
    isCanccel : false,
    inputText : ""
  },
  //定时器id
  TimeId : -1,

  //获取输入框的数据，搜索数据
  //使用定时器来防抖
  inputValueChange(e){
    //console.log(e);
    const value = e.detail.value;

    //判断是否合法
    if (!value.trim()) {
      return;
    }

    this.setData({
      inputText:value
    })

    //
    clearTimeout(this.TimeId);
    //设置定时器，1秒后触发
    this.TimeId = setTimeout(() => {
      this.getSearchTableList(value);
    }, 1000);
  },
  getSearchTableList(value){
    //请求获取数据
    var parmes = {query:value};
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch", data:parmes})
    .then(result => {
      //console.log(result);
      this.setData({
        searchTableList : result.data.message
      })
    })
    .catch(error => {
      console.log(error);
    })
  },
  //点击取消
  clickCancelButton(){

    this.setData({
      searchTableList : [],
      inputText : ""
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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