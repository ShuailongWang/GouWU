// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userModel : {},
    collectionNum : 0,
    menuList :[
      {
        id:0,
        title:"收藏的店铺",
        num:0,
        url:"/pages/collection/collection"
      },
      {
        id:1,
        title:"收藏的商品",
        num:0,
        url:"/pages/collection/collection"
      },
      {
        id:2,
        title:"关注的商品",
        num:0,
        url:"/pages/collection/collection"
      },
      {
        id:3,
        title:"我的足迹",
        num:0,
        url:"/pages/collection/collection"
      }
    ]
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
    const userInfo = wx.getStorageSync('kUserInfoKey');
    const collectiionList = wx.getStorageSync('kMyCollectionKey') || [];
    let menuList = this.data.menuList;
    menuList[1].num = collectiionList.length;
    this.setData({
      userModel:userInfo,
      menuList : menuList
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