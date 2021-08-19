export const state = () => ({
  tasks: [],
  taskIdCount: 0,
})

export const mutations = {
  addNewTask(state, newTask) {
    const newTaskValidated = newTask.trim()
    if (newTaskValidated) {
      state.tasks.push({
        id: state.taskIdCount,
        content: newTaskValidated,
        isCompleted: false,
        isPin: false,
        isEditing: false,
      })
      state.taskIdCount += 1
    }
  },
  completeTask(state, task) {
    const index = state.tasks.findIndex((taskItem) => taskItem.id === task.id)
    state.tasks[index].isCompleted = !state.tasks[index].isCompleted
  },
  pinTask(state, task) {
    const index = state.tasks.findIndex((taskItem) => taskItem.id === task.id)
    state.tasks[index].isPin = !state.tasks[index].isPin
  },
  deleteTask(state, task) {
    const index = state.tasks.findIndex((taskItem) => taskItem.id === task.id)
    state.tasks.splice(index, 1)
  },
  updateTask(state, { task, newContent }) {
    const index = state.tasks.findIndex((taskItem) => taskItem.id === task.id)
    state.tasks[index].content = newContent
  },
  completeAllTasks(state) {
    state.tasks.forEach((task) => (task.isCompleted = true))
  },
  clearCompletedTasks(state) {
    state.tasks = state.tasks.filter((task) => !task.isCompleted)
  },
  loadDataFromLocalStorage(state) {
    const taskIdCount = localStorage.getItem('taskIdCount')
    const tasks = localStorage.getItem('tasks')

    if (taskIdCount && tasks) {
      try {
        state.tasks = JSON.parse(tasks)
        if (state.tasks.length === 0) {
          state.taskIdCount = 0
          localStorage.setItem('taskIdCount', JSON.stringify(state.taskIdCount))
        }
        if (state.tasks.length) {
          state.taskIdCount = JSON.parse(taskIdCount)
        }
      } catch (e) {
        localStorage.removeItem('taskIdCount')
        localStorage.removeItem('tasks')
      }
    }
  },
  saveDataToLocalStorage(state) {
    const parsedTaskIdCount = JSON.stringify(state.taskIdCount)
    const parsedTasks = JSON.stringify(state.tasks)
    localStorage.setItem('taskIdCount', parsedTaskIdCount)
    localStorage.setItem('tasks', parsedTasks)
  },
}
