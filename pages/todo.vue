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
      <todo-input></todo-input>

      <!-- Control button -->
      <todo-control></todo-control>

      <!-- Group todo list -->
      <todo-group
        v-for="(taskGroup, index) in taskGroups"
        :key="index"
        :group-header="taskGroup.groupHeader"
        :task-list="taskGroup.taskList"
      ></todo-group>
    </v-card>
  </div>
</template>

<script>
import TodoInput from '~/components/todo/TodoInput.vue'
import TodoControl from '~/components/todo/TodoControl.vue'
import TodoGroup from '~/components/todo/TodoGroup.vue'

export default {
  name: 'Todo',
  components: {
    TodoInput,
    TodoControl,
    TodoGroup,
  },
  head: {
    title: 'Todo',
  },
  computed: {
    tasks() {
      return this.$store.state.todo.tasks
    },
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
  },
  beforeMount() {
    this.loadDataFromLocalStorage()
    window.addEventListener('beforeunload', this.saveDataToLocalStorage)
  },
  beforeDestroy() {
    this.saveDataToLocalStorage()
  },
  methods: {
    loadDataFromLocalStorage() {
      this.$store.commit('todo/loadDataFromLocalStorage')
    },
    saveDataToLocalStorage() {
      this.$store.commit('todo/saveDataToLocalStorage')
    },
  },
}
</script>
