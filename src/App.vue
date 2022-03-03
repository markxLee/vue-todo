<template>
  <div id="app">
    <InputItem
      v-on:handleAdd="handleAdd"
      v-bind:todoListLenght="todoLength"
    />
    <TodoList 
      v-bind:todos="sortPinList"
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
            todoStatus: 1,//todo: 1, done: 2
            index: 0
          },
          {
            id: 2,
            content: 'Task 2',
            isChecked: true,
            pinNumber: 0,
            todoStatus: 1,
            index: 1
          },
          {
            id: 3,
            content: 'Task 3',
            isChecked: false,
            pinNumber: 0,
            todoStatus: 1,
            index: 2
          },
          {
            id: 4,
            content: 'Task 4',
            isChecked: true,
            pinNumber: 0,
            todoStatus: 1,
            index: 3
          },
          {
            id: 5,
            content: 'Task 5',
            isChecked: true,
            pinNumber: 0,
            todoStatus: 1,
            index: 4
          },
          {
            id: 6,
            content: 'Task 6',
            isChecked: true,
            pinNumber: 0,
            todoStatus: 1,
            index: 5
          }
        ]
    }
  },
  computed: {
    todoLength() {
      return this.todos.length;
    },
    sortPinList(){
      return this.sortByPinNumber();
    },
  },
  methods: {
    handleDelete(index) {
      this.todos.splice(index, 1);
    },
    handlePin(todoIndex) {
      const todos = [...this.todos];

      const todo = todos.find((todo, index) => index === todoIndex);
      const isNotPinned = !todo.pinNumber ? true : false;

      if(isNotPinned) {
        if(this.pinNumber === 0 ){
          todo.pinNumber = this.decreaseNumber;
          this.decreaseNumber -= 1;
        } else {
          if(todo.pinNumber === 0 && (todo.pinNumber < this.decreaseNumber)){
            todo.pinNumber = this.decreaseNumber;
            this.decreaseNumber -= 1;
          }
        }
        this.todos = todos;
      } else {
        todo.pinNumber = 0;
        this.todos = this.sortByIndex(todos);
      }
      
    },
    sortByPinNumber(){
      return this.todos.sort(function(a,b){
          return b.pinNumber - a.pinNumber;
      });
    },
    sortByIndex(todos){
      return todos.sort(function(a,b){
          return a.index - b.index;
      });
    },
    handleAdd(data){
      this.todos = [...this.todos, data];
    }
  }
}
</script>

<style>
</style>
