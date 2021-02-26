// pages/auth/auth.js

import {UserLogin} from "../../request/asyncWx.js";
import {request} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //获取授权
  async getuserinfo(e){
   console.log(e);
   //获取用户信息
   const encryptedData = e.detail.encryptedData;
   const rawData = e.detail.rawData;
   const iv = e.detail.iv;
   const signature = e.detail.signature;

    //获取小程序code值
   const response = await UserLogin();
   const code = response.code;
   
   let parames = {encryptedData, rawData, iv, signature, code};

  //  //发送请求获取用户token值
  //  request({url:"https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin", data:parames, method:"post"})
  //  .then(result => {
  //   console.log(result);
  //   const token = result.token;
  //   if (token) {
  //     wx.setStorageSync('kTokenKey', token);
  //     wx.navigateBack({
  //       delta: 1,
  //     })
  //   }
  //  })
  //  .catch(error => {
  //   console.log(error);
  //  })

    //测试token
    wx.setStorageSync('kTokenKey', "woshiceshitoken123123");
    wx.navigateBack({
      delta: 1,
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