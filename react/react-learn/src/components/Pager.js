import React from 'react'
import '../style/Pager.css'
/**
 * 分页组件
 * 属性：
 * 1. current：初始页码
 * 2. total：总数据量
 * 3. limit：页容量，每页显示的数据量
 * 4. panelNumber：数字页码最多显示多少个
 * 5. onPageChange：当页码改变的事件
 */
export default function Pager(props) {
  const pageNumber = getPageNumber(props)
  if (pageNumber === 0) {
    return null
  }
  const { min, max } = getMaxMinNumber(pageNumber, props) //最大数字
  const numbers = []
  for (let i = min; i <= max; i++) {
    numbers.push(
      <span key={i} onClick={() => toPage(i, props)} className={i === props.current ? 'item active' : 'item'}>
        {i}
      </span>
    )
  }
  return (
    <>
      <span className={props.current === 1 ? 'item disabled' : 'item'} onClick={() => toPage(1, props)}>
        首页
      </span>
      <span className={props.current === 1 ? 'item disabled' : 'item'} onClick={() => toPage(props.current - 1 < 1 ? 1 : props.current - 1, props)}>
        上一页
      </span>
      {numbers}
      <span className={props.current === pageNumber ? 'item disabled' : 'item'} onClick={() => toPage(props.current + 1 > pageNumber ? pageNumber : props.current + 1, props)}>
        下一页
      </span>
      <span className={props.current === pageNumber ? 'item disabled' : 'item'} onClick={() => toPage(pageNumber, props)}>
        尾页
      </span>
      <span>{props.current}</span>/<span>{pageNumber}</span>
    </>
  )
}

/**
 * 获取最大值和最小值
 * @param {*} pageNumber 总页数
 * @param {*} props 所有属性
 * @returns
 */
function getMaxMinNumber(pageNumber, props) {
  const { current, panelNumber } = props
  const middleNumber = Math.floor(panelNumber / 2)
  const maxPale = pageNumber - middleNumber
  const minPale = middleNumber + 1
  let min, max
  if (current > minPale && current < maxPale) {
    min = current - middleNumber
    max = min + panelNumber - 1
  } else if (current <= minPale) {
    min = 1
    max = panelNumber
  } else {
    min = pageNumber - panelNumber + 1
    max = pageNumber
  }

  return { min, max }
}

/**
 * 跳转到某一页
 * @param {*} target 目标页码
 * @param {*} props  所有属性
 */
function toPage(target, props) {
  if (props.current === target) {
    return
  }
  props.onPageChange && props.onPageChange(target)
}

/**
 * 计算总页数
 * @param {*} props
 */
function getPageNumber(props) {
  return Math.ceil(props.total / props.limit)
}
