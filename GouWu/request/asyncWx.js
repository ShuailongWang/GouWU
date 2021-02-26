
export const showModal =({content}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      content: content,
      title: '提示',
      success: (result) => {
        resolve(result);
      },
      fail: (res) => {
        reject(res);
      }
    })
  })
}


// 
export const UserLogin =() => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (result) => {
        resolve(result);
      },
      fail: (res) => {
        reject(res);
      }
    })
  })
}