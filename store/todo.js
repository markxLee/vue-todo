import { v1 as uuidv1 } from 'uuid'
import { firebaseAction } from 'vuexfire'
import firebase from '~/plugins/firebase'
const db = firebase.database()

export const state = () => ({
  tasks: [],
  currentTask: {},
  isFireBaseMode: false,
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
  getIsFireBaseMode(state) {
    return state.isFireBaseMode
  },
}

export const mutations = {
  setFirebaseMode(state, params) {
    state.isFireBaseMode = params.isFireBaseMode
  },
  loadDataFromLocalStorage(state) {
    try {
      const tasks = localStorage.getItem('tasks')
      state.tasks = tasks ? JSON.parse(tasks) : []
    } catch (e) {
      localStorage.removeItem('tasks')
    }
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
}

export const actions = {
  setTasksRef: firebaseAction(
    ({ bindFirebaseRef, unbindFirebaseRef }, params) => {
      if (params.isBinding) {
        bindFirebaseRef('tasks', db.ref('tasks'))
      } else {
        unbindFirebaseRef('tasks', db.ref('tasks'))
      }
    }
  ),
  setCurrentTaskRef: firebaseAction(({ bindFirebaseRef }, params) => {
    bindFirebaseRef('currentTask', db.ref(`tasks/${params.id}`))
  }),

  addNewTask({ state, commit }, params) {
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

      if (state.isFireBaseMode) {
        db.ref(`tasks/${data.id}`).set(data)
      }

      if (!state.isFireBaseMode) {
        commit('addNewTask', { data })
      }
    }
  },
  completeTask({ state, commit }, params) {
    if (state.isFireBaseMode) {
      db.ref(`tasks/${params.task.id}`).update({
        isCompleted: !params.task.isCompleted,
      })
    }

    if (!state.isFireBaseMode) {
      commit('completeTask', params)
    }
  },
  pinTask({ state, commit }, params) {
    if (state.isFireBaseMode) {
      db.ref(`tasks/${params.task.id}`).update({ isPin: !params.task.isPin })
    }

    if (!state.isFireBaseMode) {
      commit('pinTask', params)
    }
  },
  deleteTask({ state, commit }, params) {
    if (state.isFireBaseMode) {
      db.ref(`tasks/${params.task.id}`).remove()
    }

    if (!state.isFireBaseMode) {
      commit('deleteTask', params)
    }
  },
  updateTask({ state, commit }, params) {
    if (state.isFireBaseMode) {
      db.ref(`tasks/${params.task.id}`).update({ content: params.newContent })
    }

    if (!state.isFireBaseMode) {
      commit('updateTask', params)
    }
  },
  completeAllTasks({ state, commit }) {
    if (state.isFireBaseMode) {
      state.tasks.forEach((task) => {
        !task.isCompleted &&
          db.ref(`tasks/${task.id}`).update({ isCompleted: true })
      })
    }

    if (!state.isFireBaseMode) {
      commit('completeAllTasks')
    }
  },
  clearCompletedTasks({ state, commit }) {
    if (state.isFireBaseMode) {
      const updateData = {}
      state.tasks.forEach((task) => {
        if (task.isCompleted) {
          updateData[`tasks/${task.id}`] = null
        }
      })

      db.ref().update(updateData)
    }

    if (!state.isFireBaseMode) {
      commit('clearCompletedTasks')
    }
  },
  setFirebaseMode({ commit }, params) {
    commit('setFirebaseMode', { ...params })
  },
  loadDataFromLocalStorage({ commit }) {
    commit('loadDataFromLocalStorage')
  },
  saveDataToLocalStorage({ state }) {
    const parsedTasks = JSON.stringify(state.tasks)
    localStorage.setItem('tasks', parsedTasks)
  },
}
