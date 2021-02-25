// pages/goos_detail/goos_detail.js

//引入请求
import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  //全局对象
  Goods_info:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const goods_id = options.goods_id;
    this.getDatilsData(goods_id);
  },

  //详情接口
  getDatilsData(goods_id) {
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/detail", data:{goods_id}})
    .then(result => {
      //console.log(result);

      this.Goods_info = result.data.message;
      this.setData({
        // 全部数据
        // goodsObj:result.data.message

        //只获取需要的数据
        goodsObj:{
          goods_name : result.data.message.goods_name,
          goods_price : result.data.message.goods_price,
          //ios 不识别webp图片，后台如果有jpg图片，则本地替换文字
          // goods_introduce : result.data.message.goods_introduce.replace(/\.webp/g,'.jps'),
          goods_introduce : result.data.message.goods_introduce,
          pics : result.data.message.pics,
        }
      })
    })
    .catch(error => {
      console.log(error);
    })
  },

  //点击图片 放大预览, 使用preview
  clickImageButton(e){
    console.log(e);
    //点击的索引
    const index = e.currentTarget.dataset.index

    //获取图片的url
    let urlList = []
    for (var i in this.Goods_info.pics) {
      var dict = this.Goods_info.pics[i];
      urlList.push(dict.pics_mid);
    }

    //显示图片
    wx.previewImage({
      current : urlList[index],
      urls: urlList
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