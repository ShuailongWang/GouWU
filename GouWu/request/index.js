
//同时的请求数量
let ajaxTimes = 0;

export const request = (params) => {
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"

  //
  ajaxTimes++;

  //loading
  wx.showLoading({
    title: '加载中...',
    mask : true
  });

  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success : (result) => {
        resolve(result);
      },
      fail : (error) => {
        reject(error);
      },
      complete:()=>{
        ajaxTimes--;
        if (ajaxTimes == 0) {
          wx.hideLoading();
        }
      }
    });
  })
}