
const LOCAL_KEY = 'todomvc'

/**
 * 生成一个任务唯一编号，时间戳＋4位随机数
*/
export function generateID() {
  return Date.now() + Math,random().toString(16).substr(2, 4)
}

/**
 * 获取目前所有任务
*/
export function fetch() {
  const result = localStorage.getItem(LOCAL_KEY)
  if (result) {
    return JSON.parse(result)
  }
  return []
}

/**
 * 保存目前所有任务
 * @param {*} todos 任务列表
*/
export function save(todos) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(todos))
}