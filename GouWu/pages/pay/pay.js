// pages/pay/pay.js

import {request} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //地址
    addressModel : {},
    //购物车数据
    myCarTableLists : [],
    // 总价格
    totalPrice : 0,
    // 总数量
    totalNum : 0
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
    //获取缓存地址信息
    const address = wx.getStorageSync('kAdressKey');
    //获取购物车数据
    const carList = wx.getStorageSync('kCarListKey') || [];
    //只拿checked=true的数据
    let checkTableList = [];
    for (var i in carList) {
      if (carList[i].checked){
        checkTableList.push(carList[i]);
      }
    }
    //
    this.setData({
      addressModel : address
    });
    this.setCart(checkTableList);
  },


  // 设置购物车状态，重新计算数值
  setCart(carList){
    //总价格
    let totalPrice = 0;
    //总数量
    let totalNum = 0;
    //遍历
    for (var i in carList) {
      var model = carList[i];
      //总价格 = 数量 * 价格
      totalPrice += model.num * model.goods_price;
      totalNum += model.num;
    }
    //更新
    this.setData({
      myCarTableLists : carList,
      totalPrice : totalPrice,
      totalNum : totalNum,
    })
  },

  //点击支付
  clickButButton(){
    console.log("clickButButton");
    //判断是否有token
    const token = wx.getStorageSync('kTokenKey');
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/auth',
      })
      return;
    }

    // //开始创建订单，需要后台支持，所以这里省略
    // const header = {Authorization:token};
    // const order_price = this.data.totalPrice;
    // const consignee_addr = this.data.addressModel.all;
    // const cartList = this.data.myCarTableLists;
    // let goods = [];
    // for (var i in cartList) {
    //   var dict = {
    //     goods_id : cartList[i].goods_id,
    //     goods_number : cartList[i].num,
    //     goods_price : cartList[i].goods_price,
    //   };
    //   goods.push(dict);
    // }
    // //请求获取订单号，
    // //然后使用订单号获取预支付，获取pay支付对象
    // //pay对象，是调用系统微信支付接口需要传递的参数
    // const prames = {order_price, consignee_addr, goods};
    // request({url:"https://api-hmugo-web.itheima.net/api/public/v1/orders/create", data:prames, header:header, method:"post"})
    // .then(result => {
    //   console.log(result);
    // })
    // .catch(error=>{
    //   console.log(error);
    // })

    //遍历
    let carTableList = wx.getStorageSync('kCarListKey');
    console.log(carTableList);
    let newCarlist = [];
    for (var i in carTableList) {
      var model = carTableList[i];
      if (!model.checked){
        newCarlist.push(model);
      }
    }
    console.log(newCarlist);
    wx.setStorageSync('kCarListKey', newCarlist);
    //
    wx.showToast({
      title: '支付成功',
      icon: 'success',
      mask: true
    });
    wx.navigateTo({
      url: '/pages/order/order',
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