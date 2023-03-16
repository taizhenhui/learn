// 网站标题控制

let routerTitle = ''
let siteTitle = ''
export default {
  // 设置路由标题
  setRouterTitle(title){
    routerTitle = title
    this.setTitle()
  },
  // 设置网站标题
  setSiteTitle(title){
    siteTitle = title
    this.setTitle()
  },

  setTitle(){
    if(!routerTitle && !siteTitle){
      document.title = 'loading...'
    }else if(routerTitle && !siteTitle){
      document.title = routerTitle
    }else if(!routerTitle && siteTitle){
      document.title = siteTitle
    }else{
      document.title = routerTitle + '-' + siteTitle
    }
  }
}