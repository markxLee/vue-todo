<template>
  <v-app id="app">
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
      VueJs To Do
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
          :disabled="isCompletedAll"
          @click="completeAllTasks()"
        >
          Complete all
        </v-btn>
        <v-btn
          class="text-none"
          text
          :disabled="isEmptyTask"
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
  </v-app>
</template>

<script>
import TodoGroup from './components/TodoGroup.vue'

export default {
  components: {
    TodoGroup,
  },
  data() {
    return {
      beforeEditCache: '',
      newTask: '',
      todoId: 10,
      tasks: [
        {
          id: 0,
          content: 'Di cho mua rau 0',
          isCompleted: false,
          isPin: true,
          isEditing: false,
        },
        {
          id: 1,
          content: 'Di cho mua rau 1',
          isCompleted: false,
          isPin: false,
          isEditing: false,
        },
        {
          id: 2,
          content: 'Di cho mua rau 2',
          isCompleted: false,
          isPin: false,
          isEditing: false,
        },
        {
          id: 3,
          content: 'Di cho mua rau 3',
          isCompleted: true,
          isPin: false,
          isEditing: false,
        },
        {
          id: 4,
          content: 'Di cho mua rau 4',
          isCompleted: true,
          isPin: false,
          isEditing: false,
        },
        {
          id: 5,
          content: 'Di cho mua rau 5',
          isCompleted: true,
          isPin: true,
          isEditing: false,
        },
        {
          id: 6,
          content: 'Di cho mua rau 6',
          isCompleted: false,
          isPin: false,
          isEditing: false,
        },
        {
          id: 7,
          content: 'Di cho mua rau 7',
          isCompleted: false,
          isPin: false,
          isEditing: false,
        },
        {
          id: 8,
          content: 'Di cho mua rau 8',
          isCompleted: true,
          isPin: false,
          isEditing: false,
        },
        {
          id: 9,
          content: 'Di cho mua rau 9',
          isCompleted: true,
          isPin: false,
          isEditing: false,
        },
      ],
    }
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
    isCompletedAll: function () {
      return this.tasks.every((task) => task.isCompleted)
    },
    isEmptyTask: function () {
      return this.tasks.length === 0
    },
  },
  methods: {
    addNewTask: function () {
      if (this.newTask) {
        this.tasks.push({
          id: this.todoId,
          content: this.newTask,
          isCompleted: false,
          isPin: false,
          isEditing: false,
        })
        this.newTask = ''
        this.todoId += 1
      }
    },
    completeTask: function (id) {
      const taskId = this.tasks.findIndex((task) => task.id === id)
      this.tasks[taskId].isCompleted = !this.tasks[taskId].isCompleted
    },
    pinTask: function (id) {
      const taskId = this.tasks.findIndex((task) => task.id === id)
      this.tasks[taskId].isPin = !this.tasks[taskId].isPin
    },
    deleteTask: function (id) {
      const taskId = this.tasks.findIndex((task) => task.id === id)
      this.tasks.splice(taskId, 1)
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
    },
    cancelEdit: function (id) {
      const taskId = this.tasks.findIndex((task) => task.id === id)
      this.tasks[taskId].content = this.beforeEditCache
      this.tasks[taskId].isEditing = false
    },
    completeAllTasks: function () {
      this.tasks.forEach((task) => (task.isCompleted = true))
    },
    clearCompletedTasks: function () {
      this.tasks = this.tasks.filter((task) => !task.isCompleted)
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
