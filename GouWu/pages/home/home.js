// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数据
    swiperList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //发送异步请求，获取轮播图数据
    wx:wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result) => {
        console.log(result);
        
        this.setData({
          swiperList:result.data.message
        })
      }
    })
  },

})