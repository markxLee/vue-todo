import { v1 as uuidv1 } from 'uuid'
import { firestoreAction } from 'vuexfire'
import firebase from '~/plugins/firebase'
const db = firebase.firestore()

export const state = () => ({
  tasks: [],
  currentTask: {},
  isFireStoreMode: true,
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
  setTasksRef: firestoreAction(({ bindFirestoreRef }, params) => {
    bindFirestoreRef('tasks', db.collection('tasks').orderBy('_created', 'asc'))
  }),
  setCurrentTaskRef: firestoreAction(({ bindFirestoreRef }, params) => {
    bindFirestoreRef('currentTask', db.collection('tasks').doc(params.id))
  }),

  addNewTask({ state }, params) {
    const newTaskValidated = params.newTask.trim()
    if (newTaskValidated) {
      const ref = db.collection('tasks')
      const refId = ref.doc().id
      const data = {
        id: state.isFireStoreMode ? refId : uuidv1(),
        content: newTaskValidated,
        isCompleted: false,
        isPin: false,
        isEditing: false,
        _created: firebase.firestore.FieldValue.serverTimestamp(),
        _updated: firebase.firestore.FieldValue.serverTimestamp(),
      }

      if (state.isFireStoreMode) {
        ref.doc(refId).set(data)
      }

      if (!state.isFireStoreMode) {
        state.tasks.push(data)
      }
    }
  },
  completeTask({ state }, params) {
    if (state.isFireStoreMode) {
      db.collection('tasks')
        .doc(params.task.id)
        .update({ isCompleted: !params.task.isCompleted })
    }

    if (!state.isFireStoreMode) {
      const index = state.tasks.findIndex(
        (taskItem) => taskItem.id === params.task.id
      )
      state.tasks[index].isCompleted = !state.tasks[index].isCompleted
    }
  },
  pinTask({ state }, params) {
    if (state.isFireStoreMode) {
      db.collection('tasks')
        .doc(params.task.id)
        .update({ isPin: !params.task.isPin })
    }

    if (!state.isFireStoreMode) {
      const index = state.tasks.findIndex(
        (taskItem) => taskItem.id === params.task.id
      )
      state.tasks[index].isPin = !state.tasks[index].isPin
    }
  },
  deleteTask({ state }, params) {
    if (state.isFireStoreMode) {
      db.collection('tasks').doc(params.task.id).delete()
    }

    if (!state.isFireStoreMode) {
      const index = state.tasks.findIndex(
        (taskItem) => taskItem.id === params.task.id
      )
      state.tasks.splice(index, 1)
    }
  },
  updateTask({ state }, params) {
    if (state.isFireStoreMode) {
      db.collection('tasks')
        .doc(params.task.id)
        .update({ content: !params.newContent })
    }

    if (!state.isFireStoreMode) {
      const index = state.tasks.findIndex(
        (taskItem) => taskItem.id === params.task.id
      )
      state.tasks[index].content = params.newContent
    }
  },
  completeAllTasks({ state }) {
    if (state.isFireStoreMode) {
      const batch = db.batch()
      state.tasks.forEach((task) =>
        batch.update(db.collection('tasks').doc(task.id), { isCompleted: true })
      )
      batch.commit()
    }

    if (!state.isFireStoreMode) {
      state.tasks.forEach((task) => (task.isCompleted = true))
    }
  },
  clearCompletedTasks({ state }) {
    if (state.isFireStoreMode) {
      const deleteTask = state.tasks.filter((task) => !task.isCompleted)
      const batch = db.batch()
      deleteTask.forEach((task) =>
        batch.delete(db.collection('tasks').doc(task.id))
      )
      batch.commit()
    }

    if (!state.isFireStoreMode) {
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
