// pages/cart/cart.js
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
    allChecked : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //点击地址按钮
  clickAdressButton(){
    //获取微信中填写的收货地址,最新的版本是可以直接获取
    wx.chooseAddress({
      success: (result) => {
        console.log(result);

        //地址拼接
        result.all = result.provinceName + result.cityName + result.countyName + result.detailInfo
        //保存地址
        wx.setStorageSync("kAdressKey", result)
      },
      fail : (error)=>{
        console.log(error);
      }
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
    //获取缓存地址信息
    const address = wx.getStorageSync('kAdressKey');
    //获取购物车数据
    const carList = wx.getStorageSync('kCarListKey') || [];

    //计算全选
    var allChecked = false;
    for (var i in carList) {
      if (carList[i].checked === false){
        allChecked = false;
      } else {
        allChecked = true;
      }
    }

    this.setData({
      addressModel : address,
      myCarTableLists : carList,
      allChecked : allChecked
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