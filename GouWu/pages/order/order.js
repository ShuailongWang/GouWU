// pages/order/order.js

import {request} from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderTables:[],
    //tab数据
    sectionTabList : [
      {
        id:0,
        value:"全部",
        isActive:true
      },
      {
        id:1,
        value:"代付款",
        isActive:false
      },
      {
        id:2,
        value:"待发货",
        isActive:false
      },
      {
        id:3,
        value:"退款/退货",
        isActive:false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  //点击section
  clickSection(e){
    //console.log(e);
    const itemid = e.detail;
    this.handleSectionChange(itemid);
  },
  handleSectionChange(id){
    console.log(id);

    let sectionTabList = this.data.sectionTabList;
    for (var index in sectionTabList) {
      let obj = sectionTabList[index];
      obj.isActive = (id === obj.id ? true : false)
    }

    this.setData({
      sectionTabList
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
    //获取当前页面
    let pages = getCurrentPages();
    let currentPage = pages[pages.length-1];
    const type = currentPage.options.type;
    console.log(type);
    //
    this.handleSectionChange(type-1);
    //
    this.getOrderlist(currentPage.options);
  },

  //获取订单列表
  getOrderlist(type){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/my/orders/all", data:{type}})
    .then(result=>{
      console.log(result);
      
    })
    .catch(error=>{
      console.log(error);
    })
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