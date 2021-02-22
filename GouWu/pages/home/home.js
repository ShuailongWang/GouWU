// pages/home/home.js

import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数据
    swiperList:[],
    //分类列表
    cateList:[],
    //section列表
    sectionsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //轮播图
    this.getHomeSwiperList();
    //分类列表
    this.getCateList();
    //section列表
    this.getSectionList();
  },

  //获取轮播图数据
  getHomeSwiperList(){
    //发送异步请求，获取轮播图数据
    // wx:wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     console.log(result);
        
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   },
    //   fail: (res) => {
    //     console.log(res);
    //   }
    // })

    //使用 Promise 技术封装的请求
    request({"url":"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"})
    .then(result => {
        console.log(result);
        //赋值
        this.setData({
          swiperList:result.data.message
        })
    })
    .catch(error => {
      console.log(error);
    })
  },

  //分类列表
  getCateList(){
    request({"url":"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"})
    .then(result => {
      console.log(result);
      //数据
      this.setData({
        cateList:result.data.message
      })
    })
    .catch(error => {
      console.log(error);
    })
  },

  //section列表
  getSectionList(){
    request({"url":"https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"})
    .then(result => {
      console.log(result);

      this.setData({
        sectionsList:result.data.message
      })
    })
    .catch(error => {
      console.log(error);
    })
  },

})