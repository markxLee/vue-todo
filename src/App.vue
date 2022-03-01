<template>
  <div id="app">
    
    <TodoList v-bind:todos="todos"></TodoList>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList,
  },
  data() {
    return {
        todos: [
          {
            id: 1,
            content: 'Task 1',
            isChecked: true,
            isPin: false,
            todoStatus: 0,
          },
          {
            id: 2,
            content: 'Task 2',
            isChecked: false,
            isPin: false,
            todoStatus: 0,
          },
          {
            id: 3,
            content: 'Task 3',
            isChecked: false,
            isPin: false,
            todoStatus: 0,
          },
        ]
    }
  }
}
</script>

<style>
</style>
