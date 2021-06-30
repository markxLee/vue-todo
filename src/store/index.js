import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  getters: {
    todos: state => {
      const res = [];
      state.todos.forEach((todo, index) => {
        if (todo.status === 'new') {
          todo.originalIndex = index
          res.push(todo)
        }
      })
      return res
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.status === 'done')
    }
  },
  mutations: {
    getTodoListFromLocalstore(state) {
      const localStore = localStorage.getItem("todos")

      let todos = []
      try {
        if (localStore) {
          todos = JSON.parse(localStore)
        }
      } catch(err) {
        console.warn(err)
      }

      state.todos = todos
    },
    addNewTodo(state, todo) {
      state.todos.push(todo)
    },
    removeTodo(state, index) {
      state.todos.splice(index, 1)
    },
    changeStatus(state, {index, status}) {
      state.todos[index].status = status
    },
    pinToTop(state, index) {
      const pinnedItem = state.todos[index];
      let pinnedIndex = state.todos.findIndex(item => !item.isPined);

      state.todos.splice(index, 1)
      pinnedItem.isPined = true;
      state.todos.splice(pinnedIndex, 0, pinnedItem)
    },
    unpin(state, index) {
      const pinnedItem = state.todos[index];
      let pinnedIndex = state.todos.findIndex(item => !item.isPined);

      state.todos.splice(index, 1)
      pinnedItem.isPined = false;
      state.todos.splice(pinnedIndex, 0, pinnedItem)
    }
  },
  actions: {
    initTodo(context) {
      context.commit('getTodoListFromLocalstore')
    },
    addTodo(context, todo) {
      context.commit('addNewTodo', todo)
    },
    deleteTodo(context, index) {
      context.commit('removeTodo', index)
    },
    changeStatus(context, payload) {
      context.commit('changeStatus', payload)
    },
    pinToTop(context, index) {
      context.commit('pinToTop', index)
    },
    unpin(context, index) {
      context.commit('unpin', index)
    },
    saveToLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
    }
  }
})
