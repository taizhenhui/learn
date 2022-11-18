Page({
  onLoad(){
    let db = wx.cloud.database()
    const _ = db.command
    db.collection('news')
    // .where({ // 精准查找
    //   title:'马化腾是谁'
    // })

    // .where({
    //   content: db.RegExp({ // 模糊查询
    //     regexp:'北京'
    //   })
    // })

    // .where(_.or([ // 或
    //   {
    //     content: db.RegExp({
    //       regexp:'北京'
    //     })
    //   },
    //   {
    //     title: db.RegExp({
    //       regexp:'马云'
    //     })
    //   }
    // ]))
    
    .where(_.and([  // 且
      {
        content: db.RegExp({
          regexp:'北京'
        })
      },
      {
        title: db.RegExp({
          regexp:'王健林'
        })
      }
    ]))
    
    .get()
    .then(res=>{
      console.log(res);
    }).catch(err=>console.log(err))

  },
})