
const LOCAL_KEY = 'todomvc'

/**
 * 生成一个任务唯一编号，时间戳＋4位随机数
*/
export function generateID() {
  return Date.now() + Math.random().toString(16).substring(2, 6)
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

/**
 * 保存目前所有任务
 * @param {*} todos 任务列表
*/
export function filter( todos, visibility = 'all') {
  if(visibility === 'all'){
    return todos
  }else if(visibility === 'active'){
    return todos.filter(i => !i.completed)
  }else if(visibility === 'completed'){
    return todos.filter(i => i.completed)
  }
  throw new Error('invalid visibility value')
}