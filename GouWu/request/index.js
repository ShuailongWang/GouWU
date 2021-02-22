
export const request = (params) => {
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success : (result) => {
        resolve(result);
      },
      fail : (error) => {
        reject(error);
      }
    });
  })
}