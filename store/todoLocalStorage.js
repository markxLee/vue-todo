import { v1 as uuidv1 } from 'uuid'
import firebase from '~/plugins/firebase'

export const state = () => ({
  tasks: [],
  currentTask: {},
})

export const getters = {
  getTasks(state) {
    return state.tasks
  },
  getImportantTasks(state) {
    return state.tasks.filter((task) => !task.isCompleted && task.isPin)
  },
  getCurrentTasks(state) {
    return state.tasks.filter((task) => !task.isCompleted && !task.isPin)
  },
  getCompletedTasks(state) {
    return state.tasks.filter((task) => task.isCompleted)
  },
  getCurrentTask(state) {
    return state.currentTask
  },
}

export const mutations = {
  setCurrentTask(state, params) {
    const index = state.tasks.findIndex((taskItem) => taskItem.id === params.id)
    state.currentTask = Object.assign({}, state.tasks[index])
  },
  addNewTask(state, params) {
    state.tasks.push(params.data)
  },
  completeTask(state, params) {
    const index = state.tasks.findIndex(
      (taskItem) => taskItem.id === params.task.id
    )
    state.tasks[index].isCompleted = !state.tasks[index].isCompleted
  },
  pinTask(state, params) {
    const index = state.tasks.findIndex(
      (taskItem) => taskItem.id === params.task.id
    )
    state.tasks[index].isPin = !state.tasks[index].isPin
  },
  deleteTask(state, params) {
    const index = state.tasks.findIndex(
      (taskItem) => taskItem.id === params.task.id
    )
    state.tasks.splice(index, 1)
  },
  updateTask(state, params) {
    const index = state.tasks.findIndex(
      (taskItem) => taskItem.id === params.task.id
    )
    state.tasks[index].content = params.newContent
  },
  completeAllTasks(state) {
    state.tasks.forEach((task) => (task.isCompleted = true))
  },
  clearCompletedTasks(state) {
    state.tasks = state.tasks.filter((task) => !task.isCompleted)
  },
  loadDataFromLocalStorage(state) {
    try {
      const tasks = localStorage.getItem('tasks')
      state.tasks = tasks ? JSON.parse(tasks) : []
    } catch (e) {
      localStorage.removeItem('tasks')
    }
  },
}

export const actions = {
  setCurrentTaskRef({ commit }, params) {
    commit('setCurrentTask', params)
  },
  addNewTask({ commit }, params) {
    const newTaskValidated = params.newTask.trim()
    if (newTaskValidated) {
      const data = {
        id: uuidv1(),
        content: newTaskValidated,
        isCompleted: false,
        isPin: false,
        _created: firebase.database.ServerValue.TIMESTAMP,
        _updated: firebase.database.ServerValue.TIMESTAMP,
      }

      commit('addNewTask', { data })
    }
  },
  completeTask({ commit }, params) {
    commit('completeTask', params)
  },
  pinTask({ commit }, params) {
    commit('pinTask', params)
  },
  deleteTask({ commit }, params) {
    commit('deleteTask', params)
  },
  updateTask({ commit }, params) {
    commit('updateTask', params)
  },
  completeAllTasks({ commit }) {
    commit('completeAllTasks')
  },
  clearCompletedTasks({ commit }) {
    commit('clearCompletedTasks')
  },
  loadDataFromLocalStorage({ commit }) {
    commit('loadDataFromLocalStorage')
  },
  saveDataToLocalStorage({ state }) {
    const parsedTasks = JSON.stringify(state.tasks)
    localStorage.setItem('tasks', parsedTasks)
  },
}
