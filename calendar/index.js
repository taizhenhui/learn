$(function(){

  /**
   * 获取当前时间 
   */
  function getNowDate(){
    let date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();

    return {
      currentYear: y,
      currentMonth: m,
      currentDates: d
    }
  }

  /**
   * 获取时间范围 
   */ 
  function getTimeScope(){
    let currentTime = getNowDate()
    

  }

})