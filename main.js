const STORAGE_KEY = 'vuejs-todo-app'
const fetchStorage = () => {
  const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  return todos
}

const saveStorage = (todos) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

const app = Vue.createApp({
  data() {
    return {
      todos: []
    }
  },
  created() {
    this.todos = fetchStorage()
  },
  methods: {
    addTodo() {
      const newText = this.$refs.newText
      if (!newText.value.trim) {
        return
      }

      const newId = this.createId(this.todos)
      this.todos.push({
        id: newId,
        text: newText.value
      })
      saveStorage(this.todos)

      newText.value = ''
    },
    deleteTodo(targetTodo) {
      this.todos = this.todos.filter(todo => todo.id !== targetTodo.id)
      saveStorage(this.todos)
    },
    createId(todos) {
      console.log(todos)
      if (todos.length === 0) {
        return 1
      }
      const maxId = Math.max(...todos.map(todo => todo.id))
      return maxId + 1
    }
  }
})

app.mount('#todo-app')
