$(function () {
  let minTime = moment().format('YYYY-MM-DD'), // 当前时间
    maxTime = moment().add(1, 'year').add(-1, 'd').format('YYYY-MM-DD'), // 最后时间
    minYear = moment().format('YYYY'), // 年
    minMonth = moment().format('MM'), // 月
    curYear = moment().format('YYYY'), // 当前年
    curMonth = moment().format('MM'), // 当前月
    minDates = moment().format('DD'), // 日
    selectYears = [],
    selectMonthsOne = [],
    selectMonthsTwo = [],
    // curCalendar = [], // 当前日历的数组
    doms = {}, // 获取的dom元素
    selectedDates = [] // 已选择的日期
    // switchTo = true
  /**
   * 初始化
   */
  function init() {
    // 获取dom 初始化
    doms = getDom()

    // 初始化 年
    let minY = moment(minTime).format('YYYY'),
      maxY = moment(maxTime).format('YYYY')
    selectYears = minY === maxY ? [minY] : [minY, maxY]

    // 初始化 月
    for (let i = curMonth; i <= 12; i++) {
      selectMonthsOne.push(i.toString().padStart(2, '0'))
    }
    if (selectYears.length > 1) {
      for (let i = 1; i <= moment(maxTime).format('MM'); i++) {
        selectMonthsTwo.push(i.toString().padStart(2, '0'))
      }
    }

    // 获取日历数组 初始化
    createDatas(minYear, minMonth)

    // 初始化 年月的下拉列表
    const { setYearDom, setMonthDom } = getDom()
    createOpt(setYearDom, selectYears)
    createOpt(setMonthDom, selectMonthsOne)

    // 绑定事件
    bindEvent()
  }
  init()

  // 绑定事件start
  function bindEvent() {
    const { prevDom, nextDom, setYearDom, setMonthDom } = doms
    // let tabBodys = document.querySelector('#tab-body')
    const tabBody = $('#tab-body')
    prevDom.on('click', handlePrev)
    nextDom.on('click', handleNext)
    setYearDom.on('change', handleSelectYear)
    setMonthDom.on('change', handleSelectMonth)
    tabBody.delegate('.tab-td', 'click', handleSelectDate)
    // tabBody.mouseenter(function () {
    //   tabBodys.addEventListener('wheel', debounce(handleWheel, 300))
    // })
    // tabBody.mouseleave(function () {
    //   tabBodys.removeEventListener('wheel', debounce(handleWheel, 300) )
    // })
  }
  // 绑定事件end

  // 事件处理start
  /**
   * 设置新的 当前年月
   */
  function setNewCurDate(date) {
    const { setMonthDom, setYearDom } = doms
    curYear = moment(date).format('YYYY')
    curMonth = moment(date).format('MM')
    setYearDom.val(curYear)
    if (curYear === selectYears[1]) {
      createOpt(setMonthDom, selectMonthsTwo)
    } else {
      createOpt(setMonthDom, selectMonthsOne)
    }
    // switchTo = true
    setMonthDom.val(curMonth)
    createDatas(curYear, curMonth)
  }
  // function handleWheel(e){
  //   if(!switchTo) return
  //   if (e.deltaY < -5) {
  //     // 往上滚动
  //     switchTo = false
  //     handlePrev()
  //   } else if (e.deltaY > 5) {
  //     // 往下滚动
  //     switchTo = false
  //     handleNext()
  //   }
  // }
  /**
   * 处理上月
   */
  function handlePrev() {
    let curDate = curYear + '-' + curMonth
    let minDate = moment(minTime).format('YYYY-MM')
    if (curDate > minDate) {
      let newDate = moment(curDate).add(-1, 'months').format('YYYY-MM')
      setNewCurDate(newDate)
    }
  }

  /**
   * 处理下月
   */
  function handleNext() {
    let curDate = curYear + '-' + curMonth
    let maxDate = moment(maxTime).format('YYYY-MM')
    if (curDate < maxDate) {
      let newDate = moment(curDate).add(1, 'months').format('YYYY-MM')
      setNewCurDate(newDate)
    }
  }

  /**
   * 处理选择年
   */
  function handleSelectYear(e) {
    const { setMonthDom } = doms
    let val = e.target.value
    curYear = val
    if (val === selectYears[0]) {
      curMonth = selectMonthsOne[0]
      createOpt(setMonthDom, selectMonthsOne)
    } else {
      curMonth = selectMonthsTwo[0]
      createOpt(setMonthDom, selectMonthsTwo)
    }
    createDatas(curYear, curMonth)
  }

  /**
   * 处理选择月
   */
  function handleSelectMonth(e) {
    curMonth = e.target.value
    createDatas(curYear, curMonth)
  }

  function handleSelectDate() {
    let opts = JSON.parse($(this).attr('options'))
    if (opts.isSelected === 'no') {
      opts.isSelected = 'yes'
      $(this).addClass('active')
      selectedDates.push(opts)
    } else {
      opts.isSelected = 'no'
      $(this).removeClass('active')
      selectedDates = selectedDates.filter((it) => it.date !== opts.date)
    }
    $(this).attr('options', JSON.stringify(opts))
    console.log(selectedDates, 'selectedDates')
  }
  // 事件处理end

  /**
   * 创建 select的option
   */
  function createOpt(dom, arr) {
    dom.children().remove()
    for (let i = 0; i < arr.length; i++) {
      const opt = $('<option value=""></option>')
      opt.text(arr[i])
      opt.prop('value', arr[i])
      dom.append(opt)
    }
  }

  /**
   * 生成当前月份数据
   * @param {String} y 年
   * @param {String} m 月
   * @returns {Array} 二维数组 [[],[]]
   */
  function createDatas(y, m) {
    let time = y + '-' + m,
      curMonthArr = [],
      // 获取当月1号为星期几
      firstDayIsWeek = moment(time).date(1).weekday(),
      // 获取上月天数
      prevMonthDays = moment(time).subtract(1, 'month').daysInMonth(),
      // 获取当月天数
      curMonthDays = moment(time).daysInMonth(),
      // 获取第一排天数的数组
      firstArr = [],
      prevMonth = moment(time).subtract(1, 'month').format('YYYY-MM'),
      nextMonth = moment(time)
        .month(moment(time).month() + 1)
        .format('YYYY-MM'),
      curMonth = moment(time).format('YYYY-MM')

    // 为第一排补充上月的天数
    for (let i = firstDayIsWeek - 1; i >= 0; i--) {
      let date = prevMonth + '-' + (prevMonthDays - i)
      firstArr.push(createObjDate(date, false))
    }

    // 为第一排补充当月的天数
    let len = firstArr.length
    if (len < 7) {
      for (let f = 1; f <= 7 - len; f++) {
        let date = curMonth + '-' + f.toString().padStart(2, '0')
        firstArr.push(createObjDate(date, true))
      }
    }
    curMonthArr.push(firstArr)

    // 获取剩余 天数的数组
    let arr = []
    for (
      let o = firstArr[firstArr.length - 1].day + 1;
      o <= curMonthDays;
      o++
    ) {
      let date = curMonth + '-' + o.toString().padStart(2, '0')
      arr.push(createObjDate(date, true))
      // 中间排的数组
      if (arr.length === 7 && o !== curMonthDays) {
        curMonthArr.push(arr)
        arr = []
      }
      // 最后一排的数组
      if (arr[arr.length - 1]?.day === curMonthDays) {
        let lastArrLen = arr.length
        for (let l = 1; l <= 7 - lastArrLen; l++) {
          let date = nextMonth + '-' + l.toString().padStart(2, '0')
          arr.push(createObjDate(date, false))
        }
        curMonthArr.push(arr)
        arr = []
      }
    }
    // console.log('curMonthArr', curMonthArr);
    createDom(curMonthArr)
    return curMonthArr
  }

  /**
   * 创建元素
   * @param {Array}
   */
  function createDom(curCalendar) {
    const { tabBody } = doms
    tabBody.children().remove()
    for (const tr of curCalendar) {
      let trDom = $('<div></div>')
      for (const td of tr) {
        let tdDom = $('<p></p>')
        tdDom.text(td.day)
        tdDom.prop('class', 'tab-td')
        tdDom.attr('options', JSON.stringify(td))
        // 给禁用的日期 添加类样式
        if (td.isDisabled) tdDom.addClass("disabled")
        // 给选中的日期 添加类样式
        if (td.isSelected === 'yes')  tdDom.addClass("active")
        // 给不是当月日期 添加类样式
        if (!td.isCurMonthDays) tdDom.addClass("disCurMonthDays")

        trDom.addClass('tab-tr')
        trDom.append(tdDom)
      }
      tabBody.append(trDom)
    }
  }
  /**
   * 获取元素
   * @returns {Object} doms
   * prevDom（上月） nextDom（下月） setYearDom（设置年） setMonthDom（设置月）
   * tabBody（日历） trDom(tr) tdDom(td)
   */
  function getDom() {
    let tabBody = $('#tab-body'),
      prevDom = $('#prev'),
      nextDom = $('#next'),
      setYearDom = $('#setYear'),
      setMonthDom = $('#setMonth')
    return {
      tabBody,
      prevDom,
      nextDom,
      setYearDom,
      setMonthDom,
    }
  }
  /**
   * 创建日期对象格式
   * @param {String} date 时间 年月日
   * @param {Boolean} isCurMonthDays 是否是点前月的天数 true 是 false 否
   * @returns {Object} obj 时间对象
   */
  function createObjDate(date, isCurMonthDays) {
    let obj = {
      isSelected: isSelectedDom(date) ? 'yes' : 'no', // 是否被选中 yes 选中，no 未选中
      isDisabled: isDisableDate(date), // 是否禁用该时间 true 禁用（不可选），false 不禁用（可选）
      isCurMonthDays, // 是否是当前月的日期
      year: parseFloat(moment(date).format('YYYY')), // 年
      mouth: parseFloat(moment(date).format('MM')), // 月
      day: parseFloat(moment(date).format('DD')), // 日
      date: moment(date).format('YYYY-MM-DD'), // 年 - 月 - 日 时间
    }

    return obj
  }
  /**
   * 判断该时间是否被选中
   * @param {String} date 时间 年月日
   * @returns {Boolean} true：被选中 false：未选中
   */
  function isSelectedDom(date) {
    return selectedDates.some((s) => s.date === date)
  }
  /**
   * 判断该时间是否禁用
   * @param {String} date 时间 年月日
   * @returns {Boolean} true 禁用 false 不禁用
   */
  function isDisableDate(date) {
    let curDate = moment(date).valueOf()
    let minDate = moment(minTime).valueOf()
    let maxDate = moment(maxTime).valueOf()

    if (curDate < minDate || curDate > maxDate) {
      return true
    }
    return false
  }

  function debounce(fn, duration = 300){
    let timer = null
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(()=>{
        fn(...args)
      }, duration)
    }
  }
})
