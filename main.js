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
        text: newText.value,
        isEditing: false
      })
      saveStorage(this.todos)

      newText.value = ''
    },
    createId(todos) {
      if (todos.length === 0) {
        return 1
      }
      const maxId = Math.max(...todos.map(todo => todo.id))
      return maxId + 1
    },
    editTodo(todo) {
      todo.isEditing = true
      this.$nextTick(() => document.getElementById('edit-todo').focus())
    },
    updateTodo(todo) {
      todo.isEditing = false
      saveStorage(this.todos)
    },
    deleteTodo(targetTodo) {
      this.todos = this.todos.filter(todo => todo.id !== targetTodo.id)
      saveStorage(this.todos)
    }
  }
})

app.mount('#todo-app')
