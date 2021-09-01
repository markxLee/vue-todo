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
export default {
  name: 'TodoInput',
  data() {
    return {
      newTask: '',
    }
  },
  methods: {
    addNewTask() {
      this.$store.dispatch('todo/addNewTask', { newTask: this.newTask })
      this.newTask = ''
    },
  },
}
</script>
