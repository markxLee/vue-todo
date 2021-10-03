import { v1 as uuidv1 } from 'uuid'
import { firebaseAction } from 'vuexfire'
import firebase from '~/plugins/firebase'
const db = firebase.database()

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

export const actions = {
  setTasksRef: firebaseAction(
    ({ bindFirebaseRef, unbindFirebaseRef }, params) => {
      if (params.isBinding) {
        bindFirebaseRef('tasks', db.ref('tasks'))
      } else {
        unbindFirebaseRef('tasks')
      }
    }
  ),
  setCurrentTaskRef: firebaseAction(
    ({ bindFirebaseRef, unbindFirebaseRef }, params) => {
      if (params.isBinding) {
        bindFirebaseRef('currentTask', db.ref(`tasks/${params.id}`))
      } else {
        unbindFirebaseRef('currentTask')
      }
    }
  ),

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
      db.ref(`tasks/${data.id}`).set(data)
    }
  },
  completeTask({ state }, params) {
    db.ref(`tasks/${params.task.id}`).update({
      isCompleted: !params.task.isCompleted,
    })
  },
  pinTask({ state }, params) {
    db.ref(`tasks/${params.task.id}`).update({ isPin: !params.task.isPin })
  },
  deleteTask({ state }, params) {
    db.ref(`tasks/${params.task.id}`).remove()
  },
  updateTask({ state }, params) {
    db.ref(`tasks/${params.task.id}`).update({ content: params.newContent })
  },
  completeAllTasks({ state, params }) {
    state.tasks.forEach((task) => {
      !task.isCompleted &&
        db.ref(`tasks/${task.id}`).update({ isCompleted: true })
    })
  },
  clearCompletedTasks({ state, params }) {
    const updateData = {}
    state.tasks.forEach((task) => {
      if (task.isCompleted) {
        updateData[`tasks/${task.id}`] = null
      }
    })

    db.ref().update(updateData)
  },
}
