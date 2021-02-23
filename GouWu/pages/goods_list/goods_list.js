// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //tab数据
    sectionTabList : [
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ]
  },
  
  //点击section
  clickSection(e){
    //console.log(e);
    const itemid = e.detail;

    let sectionTabList = this.data.sectionTabList;
    for (var index in sectionTabList) {
      let obj = sectionTabList[index];
      obj.isActive = (itemid === obj.id ? true : false)
    }

    this.setData({
      sectionTabList
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面传递参数的地方
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