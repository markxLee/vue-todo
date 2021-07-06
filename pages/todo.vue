<template>
  <div class="home">
    <!-- App name -->
    <div
      class="
        text-center
        display-3
        font-weight-medium
        my-10
        yellow--text
        text--darken-3
      "
    >
      Vue Todo
    </div>

    <!-- App body -->
    <v-card height="auto" width="600" class="pa-4" :elevation="6">
      <!-- New task field -->
      <v-text-field
        v-model="newTask"
        placeholder="What needs to be done"
        solo
        hide-details
        @keydown.enter="addNewTask()"
      ></v-text-field>

      <!-- Control button -->
      <v-row align="center" justify="space-between" class="ma-0 mt-4">
        <v-btn
          class="text-none"
          text
          :disabled="isDisabledCompleteAllButton"
          @click="completeAllTasks()"
        >
          Complete all
        </v-btn>
        <v-btn
          class="text-none"
          text
          :disabled="isDisabledClearCompletedButton"
          @click="clearCompletedTasks()"
        >
          Clear completed
        </v-btn>
      </v-row>

      <!-- Group todo list -->
      <TodoGroup
        v-for="(taskGroup, index) in taskGroups"
        :key="index"
        :group-header="taskGroup.groupHeader"
        :task-list="taskGroup.taskList"
        :complete-task="completeTask"
        :pin-task="pinTask"
        :delete-task="deleteTask"
        :edit-task="editTask"
        :complete-edit="completeEdit"
        :cancel-edit="cancelEdit"
      />
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
import TodoGroup from '@/components/TodoGroup.vue'

export default {
  name: 'Todo',
  components: {
    TodoGroup,
  },

  data() {
    return {
      beforeEditCache: '',
      newTask: '',
      taskIdCount: 0,
      tasks: [],
    }
  },
  head: {
    title: 'Todo',
  },
  computed: {
    taskGroups() {
      const importantTasks = this.tasks.filter(
        (task) => !task.isCompleted && task.isPin
      )
      const currentTasks = this.tasks.filter(
        (task) => !task.isCompleted && !task.isPin
      )
      const completedTasks = this.tasks.filter((task) => task.isCompleted)
      const taskGroups = [
        {
          groupHeader: 'Important tasks',
          taskList: importantTasks,
        },
        {
          groupHeader: 'Current tasks',
          taskList: currentTasks,
        },
        {
          groupHeader: 'Completed tasks',
          taskList: completedTasks,
        },
      ]

      return taskGroups
    },
    isDisabledCompleteAllButton() {
      return this.tasks.every((task) => task.isCompleted)
    },
    isDisabledClearCompletedButton() {
      return this.tasks.every((task) => !task.isCompleted)
    },
  },
  beforeMount() {
    this.loadDataFromLocalStorage()
  },
  methods: {
    addNewTask() {
      const newTaskValidated = this.newTask.trim()
      if (newTaskValidated) {
        this.tasks.push({
          id: this.taskIdCount,
          content: newTaskValidated,
          isCompleted: false,
          isPin: false,
          isEditing: false,
        })
        this.taskIdCount += 1
        this.saveDataToLocalStorage()
      }
      this.newTask = ''
    },
    completeTask(id) {
      const taskId = this.tasks.findIndex((task) => task.id === id)
      this.tasks[taskId].isCompleted = !this.tasks[taskId].isCompleted
      this.saveDataToLocalStorage()
    },
    pinTask(id) {
      const taskId = this.tasks.findIndex((task) => task.id === id)
      this.tasks[taskId].isPin = !this.tasks[taskId].isPin
      this.saveDataToLocalStorage()
    },
    deleteTask(id) {
      const taskId = this.tasks.findIndex((task) => task.id === id)
      this.tasks.splice(taskId, 1)
      this.saveDataToLocalStorage()
    },

    editTask(id) {
      const taskId = this.tasks.findIndex((task) => task.id === id)
      this.beforeEditCache = this.tasks[taskId].content
      this.tasks[taskId].isEditing = true
    },
    completeEdit(id) {
      const taskId = this.tasks.findIndex((task) => task.id === id)
      if (this.tasks[taskId].content.trim() === '') {
        this.tasks[taskId].content = this.beforeEditCache
      }
      this.tasks[taskId].isEditing = false
      this.saveDataToLocalStorage()
    },
    cancelEdit(id) {
      const taskId = this.tasks.findIndex((task) => task.id === id)
      this.tasks[taskId].content = this.beforeEditCache
      this.tasks[taskId].isEditing = false
    },
    completeAllTasks() {
      this.tasks.forEach((task) => (task.isCompleted = true))
      this.saveDataToLocalStorage()
    },
    clearCompletedTasks() {
      this.tasks = this.tasks.filter((task) => !task.isCompleted)
      this.saveDataToLocalStorage()
    },
    loadDataFromLocalStorage() {
      const taskIdCount = localStorage.getItem('taskIdCount')
      const tasks = localStorage.getItem('tasks')

      if (taskIdCount && tasks) {
        try {
          this.tasks = JSON.parse(tasks)
          if (this.tasks.length === 0) {
            this.taskIdCount = 0
            localStorage.setItem(
              'taskIdCount',
              JSON.stringify(this.taskIdCount)
            )
          }
          if (this.tasks.length) {
            this.taskIdCount = JSON.parse(taskIdCount)
          }
        } catch (e) {
          localStorage.removeItem('taskIdCount')
          localStorage.removeItem('tasks')
        }
      }
    },
    saveDataToLocalStorage() {
      const parsedTaskIdCount = JSON.stringify(this.taskIdCount)
      const parsedTasks = JSON.stringify(this.tasks)
      localStorage.setItem('taskIdCount', parsedTaskIdCount)
      localStorage.setItem('tasks', parsedTasks)
    },
  },
}
</script>
