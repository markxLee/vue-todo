<template>
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
</template>

<script>
export default {
  name: 'TodoControl',
  computed: {
    tasks() {
      return this.$store.state.todo.tasks
    },
    isDisabledCompleteAllButton() {
      return this.tasks.every((task) => task.isCompleted)
    },
    isDisabledClearCompletedButton() {
      return this.tasks.every((task) => !task.isCompleted)
    },
  },
  methods: {
    completeAllTasks() {
      this.$store.dispatch('todo/completeAllTasks')
    },
    clearCompletedTasks() {
      this.$store.dispatch('todo/clearCompletedTasks')
    },
  },
}
</script>
