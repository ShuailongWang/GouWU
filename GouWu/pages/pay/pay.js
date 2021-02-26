// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //地址
    addressModel : {},
    //购物车数据
    myCarTableLists : [],
    //是否全选
    allChecked : false,
    // 总价格
    totalPrice : 0,
    // 总数量
    totalNum : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
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