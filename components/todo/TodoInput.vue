<template>
  <v-text-field
    v-model="newTask"
    placeholder="What needs to be done"
    solo
    hide-details
    @keydown.enter="addNewTask()"
  ></v-text-field>
</template>

<script>
import { TODO } from '~/constants/todo.js'

export default {
  name: 'TodoInput',
  data() {
    return {
      newTask: '',
    }
  },
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
  },
  methods: {
    addNewTask() {
      this.$store.dispatch(`${this.storeName}/addNewTask`, {
        newTask: this.newTask,
      })
      this.newTask = ''
    },
  },
}
</script>
