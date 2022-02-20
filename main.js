const STORAGE_KEY = 'vuejs-todo-app'
const fetchStorage = () => {
  const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  return todos
}

const saveStorage = (todos) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

const createTodo = (todoText) => {
  const todos = fetchStorage()
  const newId = createId(todos)
  todos.push({
    id: newId,
    text: todoText
  })
  saveStorage(todos)
}

const createId = (todos) => {
  console.log(todos)
  if (todos.length === 0) {
    return 1
  }

  const maxId = Math.max(...todos.map(todo => todo.id))
  return maxId + 1
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

      createTodo(newText.value)
      newText.value = ''
    }
  }
})

app.mount('#todo-app')
