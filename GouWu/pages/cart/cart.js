// pages/cart/cart.js

import {showModal} from "../../request/asyncWx.js"

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
    this.setData({
      addressModel : address
    })
    //更新状态
    this.setCart(carList);
  },
  //点击复选框
  clickCheckBox(e){
    //console.log(e);
    //商品id
    const goods_id = e.currentTarget.dataset.goods_id;

    //遍历
    let carList = this.data.myCarTableLists;
    for (var i in carList) {
      var obj = carList[i];
      if (obj.goods_id === goods_id) {
        obj.checked = !obj.checked
      }
    }
    this.setCart(carList);
  },

  // 设置购物车状态，重新计算数值
  setCart(carList){
    //总价格
    let totalPrice = 0;
    //总数量
    let totalNum = 0;
    //是否全选
    var allChecked = true;
    //遍历
    for (var i in carList) {
      var model = carList[i];
      if (model.checked){
        //总价格 = 数量 * 价格
        totalPrice += model.num * model.goods_price;
        totalNum += model.num;
      } else {
        allChecked = false;
      }
    }
    //判断数组是否为空
    allChecked = carList.length!=0?allChecked:false;
    //更新
    this.setData({
      myCarTableLists : carList,
      allChecked : allChecked,
      totalPrice : totalPrice,
      totalNum : totalNum,
    })
    //保存
    wx.setStorageSync('kCarListKey', carList);
  },
  
  //点击全选
  clickAllCeckedButton(){
    let allChecked = this.data.allChecked;
    let carList = this.data.myCarTableLists;

    //全选取反
    allChecked = !allChecked;
    //遍历
    for (var i in carList) {
      carList[i].checked = allChecked;
    }
    this.setCart(carList);
  },

  //点击加减按钮
  async clickEditNumButton(e){
    //console.log(e);
    const goods_id = e.currentTarget.dataset.goods_id;
    const index = e.currentTarget.dataset.index;

    let carList = this.data.myCarTableLists;
    //遍历
    var j = -1;
    for (var i in carList) {
      var model = carList[i];
      if (model.goods_id === goods_id) {
        j = i;
        break;
      }
    }
    //判断
    if (j === -1){
      return;
    }
    //只有1条时，还是-1
    if (carList[j].num === 1 && index === -1){
      //弹框提示
      const res = await showModal({content : "是否要删除改物品？"});  // 这里有await ，需要在方法前面添加 async
      if (res.confirm) {
        carList.splice(j, 1);//删除数据，（索引，数量）
        this.setCart(carList);
      }
      // wx.showModal({
      //   cancelText: '取消',
      //   confirmText: '确定',
      //   content: '是否要删除改物品？',
      //   success: (result) => {
      //     if (result.confirm) {
      //       carList.splice(j, 1);//删除数据，（索引，数量）
      //       this.setCart(carList);
      //     }
      //   }
      // })

    } else {
      carList[j].num += index;
      this.setCart(carList);
    }
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