<template>
  <v-app class="d-flex justify-content">
    <v-container>
      <v-card>
        <v-card-title class="display-1">TODO LIST - LOCAL STORAGE</v-card-title>
        <v-card-text>
          <input-item-local-storage
            v-on:handleAdd="handleAdd"
            v-bind:todoListLenght="todoLength"
          />
          <todo-list-local-storage
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

import InputItemLocalStorage from '../components/LocalStorage/InputItemLocalStorage.vue'
import TodoListLocalStorage from '../components/LocalStorage/TodoListLocalStorage.vue'

export default {
  name: 'App',
  components: {
    TodoListLocalStorage,
    InputItemLocalStorage,
  },
  created() {
    this.todos = JSON.parse(localStorage.getItem(TODO_LOCAL_STORAGE) || '[]');
  },
  data() {
    return {
        decreaseNumber: 0,
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
    handleDelete(id) {
      let index = this.todos.findIndex(todo => todo.id === id);
      this.todos.splice(index, 1);
      localStorage.setItem(TODO_LOCAL_STORAGE, JSON.stringify(this.todos));
    },
    handlePin(id) {
      let index = this.todos.findIndex(todo => todo.id === id);
      const todo = this.todos[index];

      const isNotPinned = !todo.pinNumber ? true : false;
      this.decreaseNumber = this.todos.length;
      if(isNotPinned) {
        if(todo.pinNumber === 0 ){
          todo.pinNumber = this.decreaseNumber;
          this.decreaseNumber -= 1;
        } else {
          if(todo.pinNumber !== 0 && (todo.pinNumber < this.decreaseNumber)){
            todo.pinNumber = this.decreaseNumber;
            this.decreaseNumber -= 1;
          }
        }

        this.todos[index].pinNumber = todo.pinNumber;
        localStorage.setItem(TODO_LOCAL_STORAGE, JSON.stringify(this.todos));
      } else {
        todo.pinNumber = 0;

        this.todos = this.sortByIndex(this.todos);
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
      const todos = [...this.todos]
      todos.forEach((todo, index) => {
        if(todo.pinNumber !== 0) {
          todos[index].pinNumber++;
        }
      });
      this.todos = todos;
      this.todos.push(data);
      localStorage.setItem(TODO_LOCAL_STORAGE, JSON.stringify(this.todos));
    },
    handleDone(id){
      let index = this.todos.findIndex(todo => todo.id === id);
      this.todos[index].todoStatus = 2;
      localStorage.setItem(TODO_LOCAL_STORAGE, JSON.stringify(this.todos));
      
    },
    handleCheck(id){
      let index = this.todos.findIndex(todo => todo.id === id);
      this.todos[index].isChecked = !this.todos[index].isChecked;
      localStorage.setItem(TODO_LOCAL_STORAGE, JSON.stringify(this.todos));
    }
  }
}
</script>

<style>
</style>
