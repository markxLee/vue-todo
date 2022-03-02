<template>
  <div id="app">
    <InputItem
      v-on:handleAdd="handleAdd"
      v-bind:todoListLenght="todoLength"
    />
    <TodoList 
      v-bind:todos="todos" 
      v-on:handleDelete="handleDelete"
      v-on:handlePin="handlePin"
    />
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
        decreaseNumber: 6,
        todos: [
          {
            id: 1,
            content: 'Task 1',
            isChecked: true,
            pinNumber: 0,
            todoStatus: 1,//remove: 0, todo: 1, done: 2
          },
          {
            id: 2,
            content: 'Task 2',
            isChecked: true,
            pinNumber: 0,
            todoStatus: 1,
          },
          {
            id: 3,
            content: 'Task 3',
            isChecked: false,
            pinNumber: 0,
            todoStatus: 1,
          },
          {
            id: 4,
            content: 'Task 4',
            isChecked: true,
            pinNumber: 0,
            todoStatus: 1,
          },
          {
            id: 5,
            content: 'Task 5',
            isChecked: true,
            pinNumber: 0,
            todoStatus: 1,
          },
          {
            id: 6,
            content: 'Task 6',
            isChecked: true,
            pinNumber: 0,
            todoStatus: 1,
          }
        ]
    }
  },
  computed: {
    todoLength() {
      return this.todos.id;
    }
  },
  methods: {
    handleDelete(deleteID) {
      this.todos = this.todos.filter(todo => todo.id !== deleteID);
    },
    handlePin(id) {
      const todo = this.todos.filter(todo => todo.id === id)[0];
      
      if(this.pinNumber === 0 ){
        todo.pinNumber = this.decreaseNumber;
        this.decreaseNumber -= 1;
      } else {
        if(todo.pinNumber === 0 && (todo.pinNumber < this.decreaseNumber)){
          todo.pinNumber = this.decreaseNumber;
          this.decreaseNumber -= 1;
        }
      }

      console.log(todo.content);
      console.log("todo.pinNumber: ", todo.pinNumber);
      console.log("this.increaseNumber: ", this.decreaseNumber);

      this.todos.sort(function(a,b){
        if(a.pinNumber < b.pinNumber){
          return 1;
        }
        if(a.pinNumber > b.pinNumber){
          return -1;
        }
        return 0;
      })
    },
    handleAdd(data){
      this.todos = [...this.todos, data];
    }
  }
}
</script>

<style>
</style>
