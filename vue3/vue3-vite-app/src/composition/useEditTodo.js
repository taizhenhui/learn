import { computed, ref } from "vue"


export default function useEditTodo(todosRef) {
  const editTodoRef = ref(null)
  let originTitle = null
  const editTodo = (todo) => {
    originTitle = todo.title
    editTodoRef.value = todo
  }

  const doneEdit = (todo) => {
    editTodoRef.value = null
    const title = todo.title.trim()
    if(title) {
      todo.title = title
    } else {
      const i = todosRef.value.indexOf(todo)
      if(i > -1) todosRef.value.splice(i, 1)
    }
  }

  const cancelEdit = (todo) => {
    editTodoRef.value = null
    todo.title = originTitle
  }

  const allDoneRef = computed({
    get(){
      console.log(todosRef.value);
      return todosRef.value.every( it => it.completed )
    },
    set(checked){
      todosRef.value.forEach(it=> it.completed = checked)
    }
  })

  return {
    editTodoRef,
    editTodo,
    doneEdit,
    cancelEdit,
    allDoneRef,
  }
}