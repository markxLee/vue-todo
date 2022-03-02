<template>
  <div id="app">
    <InputItem
      v-on:handleAdd="handleAdd"
      v-bind:todoListLenght="todoLength"
    />
    <TodoList v-bind:todos="todos" v-on:handleDelete="handleDelete"></TodoList>
  </div>
</template>

<script>
import InputItem from './components/InputItem.vue'
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList,
    InputItem,
  },
  data() {
    return {
        todos: [
          {
            id: 1,
            content: 'Task 1',
            isChecked: true,
            isPin: false,
            todoStatus: 1,//remove: 0, todo: 1, done: 2
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
            todoStatus: 1,
          },
          {
            id: 4,
            content: 'Task 4',
            isChecked: true,
            isPin: false,
            todoStatus: 1,
          },
          {
            id: 5,
            content: 'Task 5',
            isChecked: true,
            isPin: false,
            todoStatus: 1,
          },
          {
            id: 6,
            content: 'Task 6',
            isChecked: true,
            isPin: false,
            todoStatus: 1,
          },
          {
            id: 7,
            content: 'Task 7',
            isChecked: true,
            isPin: false,
            todoStatus: 1,
          },
        ]
    }
  },
  computed: {
    todoLength() {
      return this.todos.length;
    }
  },
  methods: {
    handleDelete(deleteID) {
      this.todos = this.todos.filter(todo => todo.id !== deleteID);
    },
    handleAdd(data){
      this.todos = [...this.todos, data];
    }
  }
}
</script>

<style>
</style>
