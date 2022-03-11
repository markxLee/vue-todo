<template>
  <v-app class="d-flex justify-content">
    <v-container>
      <v-card>
        <v-card-title class="display-1">TODO LIST - CREATE</v-card-title>
        <v-card-text>
          <input-item
            v-on:handleAdd="handleAdd"
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

import InputItem from '../components/InputItem.vue'
import TodoList from '../components/TodoList.vue'
import Todo from '../services/Todo'

export default {
  name: 'App',
  components: {
    TodoList,
    InputItem,
  },
  async created() {
    this.todos = (await Todo.index()).data || '[]';
  },
  async mounted () {
  },
  data() {
    return {
        decreaseNumber: 0,
        increaseNunmber: 0,
        todos: []
    }
  },
  computed: {
    sortPinList(){
      return this.sortByPinNumber();
    },
  },
  methods: {
    async handleDelete(id) {
      let index = this.todos.findIndex(todo => todo.id === id);
      console.log(id);
      await Todo.delete(id);
      this.todos.splice(index, 1);
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
      } else {
        todo.pinNumber = 0;
        this.todos[index].pinNumber = todo.pinNumber

        this.todos = this.sortByIndex(this.todos);
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
    async handleAdd(data){
      data = {
        index: this.increaseNunmber,
        ...data
      }
      await Todo.create(data);
      this.todos.push(data);
    },
    async handleDone(id){
      let index = this.todos.findIndex(todo => todo.id === id);
      await Todo.done({id});
      this.todos[index].todoStatus = 2;
    },
    handleCheck(id){
      let index = this.todos.findIndex(todo => todo.id === id);
      this.todos[index].isChecked = !this.todos[index].isChecked;
    }
  }
}
</script>

<style>
</style>
