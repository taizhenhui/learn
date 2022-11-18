Page({
  data:{
    docImg:'',
    downloadUrl:''
  },
  async chooseFile(){
    try{
      let res = await wx.chooseMessageFile({
        count: 1,
        type:'all',
      })
      await wx.cloud.uploadFile({
        cloudPath: res.tempFiles[0].name,
        filePath: res.tempFiles[0].path,
      })
    }catch(err){
      console.warn(err);
    }
  },
  async downloadFile(){
    let {downloadUrl} = this.data
    if(downloadUrl==''){
      wx.showToast({
        icon: 'none',
        title: '请输入下载链接',
      })
      return
    }
    let res = await wx.cloud.downloadFile({
      fileID: downloadUrl
    })
    wx.openDocument({
      filePath: res.tempFilePath,
    })
    console.log(res);
  }
})