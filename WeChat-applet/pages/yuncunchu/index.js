Page({
  data: {},
  onLoad() {

  },
  async seleteImg() {
    try {
      let res = await wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera']
      })
      console.log('res',res);
      let resImg = await wx.cloud.uploadFile({
        // 指定上传到的云路径
        cloudPath: `${+new Date()}.jpg`,
        // 指定要上传的文件的小程序临时文件路径
        filePath: res.tempFiles[0].tempFilePath,
      })
      console.log('resImg',resImg);
    } catch (err) {
      console.log(err);
    }
  }
})