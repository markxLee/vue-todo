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
        label="What needs to be done"
        solo
        hide-details
        v-model="newTask"
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
        :groupHeader="taskGroup.groupHeader"
        :taskList="taskGroup.taskList"
        :completeTask="completeTask"
        :pinTask="pinTask"
        :deleteTask="deleteTask"
        :editTask="editTask"
        :completeEdit="completeEdit"
        :cancelEdit="cancelEdit"
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
  beforeMount() {
    this.loadDataFromLocalStorage()
  },
  computed: {
    taskGroups: function () {
      const importantTasks = this.tasks.filter(
        (task) => !task.isCompleted && task.isPin,
      )
      const currentTasks = this.tasks.filter(
        (task) => !task.isCompleted && !task.isPin,
      )
      const completedTasks = this.tasks.filter((task) => task.isCompleted)
      const taskGroups = [
        {
          groupHeader: 'Important task',
          taskList: importantTasks,
        },
        {
          groupHeader: 'Current task',
          taskList: currentTasks,
        },
        {
          groupHeader: 'Completed task',
          taskList: completedTasks,
        },
      ]

      return taskGroups
    },
    isDisabledCompleteAllButton: function () {
      return this.tasks.every((task) => task.isCompleted)
    },
    isDisabledClearCompletedButton: function () {
      return this.tasks.every((task) => !task.isCompleted)
    },
  },
  methods: {
    addNewTask: function () {
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
    completeTask: function (id) {
      const taskId = this.tasks.findIndex((task) => task.id === id)
      this.tasks[taskId].isCompleted = !this.tasks[taskId].isCompleted
      this.saveDataToLocalStorage()
    },
    pinTask: function (id) {
      const taskId = this.tasks.findIndex((task) => task.id === id)
      this.tasks[taskId].isPin = !this.tasks[taskId].isPin
      this.saveDataToLocalStorage()
    },
    deleteTask: function (id) {
      const taskId = this.tasks.findIndex((task) => task.id === id)
      this.tasks.splice(taskId, 1)
      this.saveDataToLocalStorage()
    },

    editTask: function (id) {
      const taskId = this.tasks.findIndex((task) => task.id === id)
      this.beforeEditCache = this.tasks[taskId].content
      this.tasks[taskId].isEditing = true
    },
    completeEdit: function (id) {
      const taskId = this.tasks.findIndex((task) => task.id === id)
      if (this.tasks[taskId].content.trim() === '') {
        this.tasks[taskId].content = this.beforeEditCache
      }
      this.tasks[taskId].isEditing = false
      this.saveDataToLocalStorage()
    },
    cancelEdit: function (id) {
      const taskId = this.tasks.findIndex((task) => task.id === id)
      this.tasks[taskId].content = this.beforeEditCache
      this.tasks[taskId].isEditing = false
    },
    completeAllTasks: function () {
      this.tasks.forEach((task) => (task.isCompleted = true))
      this.saveDataToLocalStorage()
    },
    clearCompletedTasks: function () {
      this.tasks = this.tasks.filter((task) => !task.isCompleted)
      this.saveDataToLocalStorage()
    },
    loadDataFromLocalStorage: function () {
      const taskIdCount = localStorage.getItem('taskIdCount')
      const tasks = localStorage.getItem('tasks')
      console.log(tasks)

      if (taskIdCount && tasks) {
        try {
          this.taskIdCount = JSON.parse(taskIdCount)
          this.tasks = JSON.parse(tasks)
        } catch (e) {
          localStorage.removeItem('taskIdCount')
          localStorage.removeItem('tasks')
          console.log(e)
        }
      }
    },
    saveDataToLocalStorage: function () {
      const parsedTaskIdCount = JSON.stringify(this.taskIdCount)
      const parsedTasks = JSON.stringify(this.tasks)
      localStorage.setItem('taskIdCount', parsedTaskIdCount)
      localStorage.setItem('tasks', parsedTasks)
    },
  },
}
</script>
