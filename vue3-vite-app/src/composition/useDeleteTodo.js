

export default function useEeleteTodo(todosRef) {

  const delTodo = todo =>{
    const i = todosRef.value.indexOf(todo)
    if(i > -1) todosRef.value.splice(i, 1)
  }
  
  const delAllTodo = () => {
    if(!todosRef.value.length) return
    todosRef.value = todosRef.value.filter(it=> !it.completed)
  }
  return {
    delTodo,
    delAllTodo,
  }
}