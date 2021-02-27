// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //tab数据
    sectionTabList : [
      {
        id:0,
        value:"体验问题",
        isActive:true
      },
      {
        id:1,
        value:"商品/商家投诉",
        isActive:false
      }
    ],
    //选中的图片数组
    chooseImgList : [],
    //
    inputText:""
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

  //点击添加图片按钮
  clickAddImgButton(){
    wx.chooseImage({
      count: 9, //同时选中的数量
      sizeType: ['compressed','compressed'],//类型,原图，压缩
      sourceType: ['album','camera'],//涞源，相册，相机
      success: (result) => {
        console.log(result);

        this.setData({
          chooseImgList : this.data.chooseImgList.concat(result.tempFilePaths)
        })
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },

  //删除图片
  clickDeleteButton(e){
    //console.log(e);
    const index = e.currentTarget.dataset.index;
    //
    let imageList = this.data.chooseImgList;
    //
    imageList.splice(index, 1);
    //
    this.setData({
      chooseImgList:imageList
    })
  },

  //文本输入
  textValueChange(e){
    console.log(e);
    const value = e.detail.value;
    this.setData({
      inputText : value
    })
  },

  //点击提交
  clickSubmitButton(){
    const textValue = this.data.inputText;
    //判断文本是否合法
    if (!textValue.trim()) {
      wx.showToast({
        title: '请输入有效的内容',
        icon:'none',
        mask: true,
      })
      return;
    }
    //
    // wx.uploadFile({
    //   filePath: 'filePath', //文件的路径
    //   name: 'name', //服务器定义好的名字
    //   url: 'url', //上传的服务器
    //   formData: formData, //顺带的文本信息
    //   header: header,
    //   timeout: 0,
    //   success: (result) => {},
    //   fail: (res) => {},
    //   complete: (res) => {},
    // })

    this.setData({
      inputText:"",
      chooseImgList:[]
    })

    wx.showToast({
      title: '提交成功',
      icon:'success',
      mask: true,
      success: (res) => {
        //back
        wx.navigateBack({
          delta: 1,
        })
      }
    });
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