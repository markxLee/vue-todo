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
import { TODO } from '~/constants/todo.js'

export default {
  name: 'TodoControl',
  computed: {
    STORAGE_MODE() {
      return TODO.STORAGE_MODE
    },
    storageMode() {
      return this.$store.getters['todoController/getStorageMode']
    },
    storeName() {
      if (this.storageMode === this.STORAGE_MODE.LOCAL_STORAGE) {
        return 'todoLocalStorage'
      }
      if (this.storageMode === this.STORAGE_MODE.FIREBASE) {
        return 'todoFirebase'
      }
      return ''
    },
    tasks() {
      return this.$store.getters[`${this.storeName}/getTasks`]
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
      this.$store.dispatch(`${this.storeName}/completeAllTasks`)
    },
    clearCompletedTasks() {
      this.$store.dispatch(`${this.storeName}/clearCompletedTasks`)
    },
  },
}
</script>
