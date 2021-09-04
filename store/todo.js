import { v1 as uuidv1 } from 'uuid'
import { firebaseAction } from 'vuexfire'
import firebase from '~/plugins/firebase'
const db = firebase.database()

export const state = () => ({
  tasks: [],
  currentTask: {},
  isFireBaseMode: true,
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

export const actions = {
  setTasksRef: firebaseAction(({ bindFirebaseRef }, params) => {
    bindFirebaseRef('tasks', db.ref('tasks'))
  }),
  setCurrentTaskRef: firebaseAction(({ bindFirebaseRef }, params) => {
    bindFirebaseRef('currentTask', db.ref(`tasks/${params.id}`))
  }),

  addNewTask({ state }, params) {
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
        state.tasks.push(data)
      }
    }
  },
  completeTask({ state }, params) {
    if (state.isFireBaseMode) {
      db.ref(`tasks/${params.task.id}`).update({
        isCompleted: !params.task.isCompleted,
      })
    }

    if (!state.isFireBaseMode) {
      const index = state.tasks.findIndex(
        (taskItem) => taskItem.id === params.task.id
      )
      state.tasks[index].isCompleted = !state.tasks[index].isCompleted
    }
  },
  pinTask({ state }, params) {
    if (state.isFireBaseMode) {
      db.ref(`tasks/${params.task.id}`).update({ isPin: !params.task.isPin })
    }

    if (!state.isFireBaseMode) {
      const index = state.tasks.findIndex(
        (taskItem) => taskItem.id === params.task.id
      )
      state.tasks[index].isPin = !state.tasks[index].isPin
    }
  },
  deleteTask({ state }, params) {
    if (state.isFireBaseMode) {
      db.ref(`tasks/${params.task.id}`).remove()
    }

    if (!state.isFireBaseMode) {
      const index = state.tasks.findIndex(
        (taskItem) => taskItem.id === params.task.id
      )
      state.tasks.splice(index, 1)
    }
  },
  updateTask({ state }, params) {
    if (state.isFireBaseMode) {
      db.ref(`tasks/${params.task.id}`).update({ content: params.newContent })
    }

    if (!state.isFireBaseMode) {
      const index = state.tasks.findIndex(
        (taskItem) => taskItem.id === params.task.id
      )
      state.tasks[index].content = params.newContent
    }
  },
  completeAllTasks({ state }) {
    if (state.isFireBaseMode) {
      state.tasks.forEach((task) => {
        !task.isCompleted &&
          db.ref(`tasks/${task.id}`).update({ isCompleted: true })
      })
    }

    if (!state.isFireBaseMode) {
      state.tasks.forEach((task) => (task.isCompleted = true))
    }
  },
  clearCompletedTasks({ state }) {
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
      state.tasks = state.tasks.filter((task) => !task.isCompleted)
    }
  },
  loadDataFromLocalStorage(state) {
    try {
      const tasks = localStorage.getItem('tasks')
      state.tasks = JSON.parse(tasks)
    } catch (e) {
      localStorage.removeItem('tasks')
    }
  },
  saveDataToLocalStorage(state) {
    const parsedTasks = JSON.stringify(state.tasks)
    localStorage.setItem('tasks', parsedTasks)
  },
}
