import * as todoStorage from '../utils/todoStorage'
import { ref } from 'vue'

export default function useNewTodo(todosRef) {
  const newTodoRef = ref('')

  const addTodo = () => {
    const value = newTodoRef.value && newTodoRef.value.trim()
    if (!value) return

    // 生成任务对象，将其加入到任务列表中
    const todo = {
      id: todoStorage.generateID(),
      title: value,
      completed: false, // 任务是否完成
    }
    todosRef.value.push(todo)
    newTodoRef.value = ''
  }
  return {
    newTodoRef,
    addTodo
  }
}