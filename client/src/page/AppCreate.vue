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
    try {
      this.tokens = JSON.parse(localStorage.getItem("token") || '[]');
      this.todos = (await Todo.index(this.tokens)).data || '[]';
    } catch (error) {
      console.log(error);
    }
  },
  async mounted () {
    this.decreaseNumber = this.todos.length;
  },
  data() {
    return {
        decreaseNumber: 0,
        increaseNumber: 0,
        todos: [],
        tokens: [],
    }
  },
  computed: {
    sortPinList(){
      return this.sortByPinNumber();
    }
  },
  methods: {
    async handlePin(id) {
      let index = this.todos.findIndex(todo => todo._id === id);
      const todo = this.todos[index];

      const isNotPinned = !todo.pinNumber ? true : false;
      this.decreaseNumber = this.decreaseNumber && this.todos.length;
      if(isNotPinned) {
        if(todo.pinNumber === 0 ){
          console.log("decreaseNumber Before:=", this.decreaseNumber);
          todo.pinNumber = this.decreaseNumber;
          this.decreaseNumber -= 1;
          console.log("decreaseNumber After:=", this.decreaseNumber);
        } else {
          if(todo.pinNumber < this.decreaseNumber){
            todo.pinNumber = this.decreaseNumber;
            this.decreaseNumber -= 1;
          }
        }
        await Todo.pin({id, pinNumber: todo.pinNumber});
      } else {
        todo.pinNumber = 0;
        this.decreaseNumber += 1;
        console.log("CALL UNPIN METHOD");
        await Todo.pin({id, pinNumber: todo.pinNumber});
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
      const todos = [...this.todos]
      todos.forEach((todo, index) => {
        if(todo.pinNumber !== 0) {
          todos[index].pinNumber++;
        }
      });
      this.todos = todos;

      data = {
        index: this.increaseNumber++,
        ...data
      }
      const _id = await Todo.create(data);
      this.todos.push({_id, ...data});
    },
    async handleDelete(id) {
      let index = this.todos.findIndex(todo => todo._id === id);
      await Todo.delete({id});
      this.todos.splice(index, 1);
    },
    async handleDone(id){
      let index = this.todos.findIndex(todo => todo._id === id);
      await Todo.done({id});
      this.todos[index].todoStatus = 2;
    },
    async handleCheck(id){
      let index = this.todos.findIndex(todo => todo._id === id);
      await Todo.check({id});
      this.todos[index].isChecked = !this.todos[index].isChecked;
    }
  }
}
</script>

<style>
</style>
