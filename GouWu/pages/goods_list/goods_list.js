
//引入请求
import { request } from "../../request/index.js";

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
    ],
    goodsTableList:[]
  },
  
  //参数
  QueryParams:{
    query : "",
    cid : "",
    pagenum : 1,
    pagesize : 10
  },
  //总页数
  totalPages : 1,

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
    //console.log(options);
    this.QueryParams.cid = options.cid;

    //获取列表
    this.getGoodsList();
  },

  //获取列表
  getGoodsList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/search", data:this.QueryParams})
    .then(result => {
      //console.log(result);
      //获取总条数
      const total = result.data.message.total;
      //说去总页数
      this.totalPages = Math.ceil(total / this.QueryParams.pagesize)

      //关闭下拉loading
      wx.stopPullDownRefresh()

      //赋值
      this.setData({
        goodsTableList : [...this.data.goodsTableList, ...result.data.message.goods]
      })
    })
    .catch(error => {
      console.log(error);
      //关闭下拉loading
      wx.stopPullDownRefresh()
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
    //下拉刷新
    this.setData({
      goodsTableList : []
    })
    this.QueryParams.pagenum = 1;
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //上拉刷新，判断是否有下一页
    if (this.QueryParams.pagenum >= this.totalPages){ //没有下一页数据
      wx.showToast({
        title: '没有数据了',
      })
    } else {  //还有下一页
      this.QueryParams.pagenum++; //页码+1
      this.getGoodsList();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})