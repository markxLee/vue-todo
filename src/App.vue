<template>
  <v-app class="d-flex justify-content">
    <v-container>
      <v-card>
        <v-card-title class="display-1">TODO LIST</v-card-title>
        <v-card-text>
          <input-item
            v-on:handleAdd="handleAdd"
            v-bind:todoListLenght="todoLength"
          />
          <todo-list 
            v-bind:todos="sortPinList"
            v-on:handleCheck="handleCheck"
            v-on:handleDelete="handleDelete"
            v-on:handleDone="handleDone"
            v-on:handlePin="handlePin"
          />
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
const TODO_LOCAL_STORAGE = 'todo-local-storage-data';

import InputItem from './components/InputItem.vue'
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList,
    InputItem,
  },
  created() {
    this.todos = JSON.parse(localStorage.getItem(TODO_LOCAL_STORAGE) || '[]');
  },
  data() {
    return {
        decreaseNumber: 6,
        todos: []
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
      localStorage.setItem(TODO_LOCAL_STORAGE, JSON.stringify(this.todos));
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
        localStorage.setItem(TODO_LOCAL_STORAGE, JSON.stringify(this.todos));
      } else {
        todo.pinNumber = 0;
        this.decreaseNumber += 1;
        this.todos = this.sortByIndex(todos);
        localStorage.setItem(TODO_LOCAL_STORAGE, JSON.stringify(this.todos));
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
      localStorage.setItem(TODO_LOCAL_STORAGE, JSON.stringify(this.todos));
    },
    handleDone(todoIndex){
      this.todos[todoIndex].todoStatus = 2;
      localStorage.setItem(TODO_LOCAL_STORAGE, JSON.stringify(this.todos));
    },
    handleCheck(todoIndex){
      this.todos[todoIndex].isChecked = !this.todos[todoIndex].isChecked;
      localStorage.setItem(TODO_LOCAL_STORAGE, JSON.stringify(this.todos));
    }
  }
}
</script>

<style>
</style>
