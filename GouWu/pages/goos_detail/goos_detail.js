// pages/goos_detail/goos_detail.js

//引入请求
import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    isCollection : false
  },
  //全局对象
  Goods_info:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //详情接口
  getDatilsData(goods_id) {
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/detail", data:{goods_id}})
    .then(result => {
      //console.log(result);

      this.Goods_info = result.data.message;
      //拿到收藏数据
      let collectionList = wx.getStorageSync('kMyCollectionKey') || [];
      var isCollection = false;
      for (var i in collectionList) {
        if (collectionList[i].goods_id === this.Goods_info.goods_id) {
          isCollection = true;
          break;
        }
      }
      //
      this.setData({
        isCollection : isCollection,

        // 全部数据
        // goodsObj:result.data.message

        //只获取需要的数据
        goodsObj:{
          goods_name : result.data.message.goods_name,
          goods_price : result.data.message.goods_price,
          goods_id : result.data.message.goods_id,
          //ios 不识别webp图片，后台如果有jpg图片，则本地替换文字 【不推荐】
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
    //console.log(e);
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
      current : urlList[index], // 当前的图片
      urls: urlList
    })
  },

  //点击加入购物车
  clickCarButton(){
    //获取购物车数据
    let carList = wx.getStorageSync("kCarListKey") || [];
    //判断商品id是否在购物车中
    var index = -1;
    for (var i in carList) {
      if (this.Goods_info.goods_id === carList[i].goods_id){
        index = i;
        break;
      }
    }
    //是否存在
    if (index===-1) {
      this.Goods_info.num=1;
      this.Goods_info.checked = true;
      carList.push(this.Goods_info);
    } else {
      carList[index].num++;
    }

    //保存
    wx.setStorageSync('kCarListKey', carList);
    wx.showToast({
      title: '加入成功',
      icon: 'sucess',
      mask: true
    })
  },

  //点击立即购买
  clickBuyButton(){

  },

  //点击收藏
  clickCollectionButton(){
    //拿到收藏数据
    let collectionList = wx.getStorageSync('kMyCollectionKey') || [];
    let isCollection = false;
    var index = -1;
    const goods_info = this.Goods_info;
    for (var i in collectionList) {
      if (collectionList[i].goods_id === goods_info.goods_id) {
        index = i;
        break;
      }
    }
    //判断是否收藏
    var message = "";
    if (index === -1){
      //不存在，添加
      isCollection = true;
      collectionList.push(goods_info);
      message = "收藏成功";
    } else {
      //已收藏，删除
      isCollection = false;
      collectionList.splice(index, 1);
      message = "取消收藏";
    }

    wx.showToast({
      title: message,
      icon: 'sucess',
      mask: true
    })

    wx.setStorageSync('kMyCollectionKey', collectionList);
    this.setData({
      isCollection : isCollection
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
    //console.log(options);
    const pages = getCurrentPages();
    const currentpage = pages[pages.length-1];

    const goods_id = currentpage.options.goods_id;
    this.getDatilsData(goods_id);
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