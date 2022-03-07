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
import db from './firebase';

export default {
  name: 'App',
  components: {
    TodoList,
    InputItem,
  },
  created() {
    // this.todos = JSON.parse(localStorage.getItem(TODO_LOCAL_STORAGE) || '[]');
    db.collection("todoList").get()
    .then(docs => {
      docs.forEach(doc => {
        this.todos.push(doc.data());
      })
    })
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
    handleDelete(id) {
      let index = this.todos.findIndex(todo => todo.id === id);
      //this.todos.splice(index, 1);
      //localStorage.setItem(TODO_LOCAL_STORAGE, JSON.stringify(this.todos));

      let item = db.collection("todoList").where("id","==",id);
      item.get().then(data => {
        return data.docs[0].ref.delete({
        })
        .then(() => {
          this.todos.splice(index, 1);
        })
      })
    },
    handlePin(todoIndex) {
      const todos = [...this.todos];
      const todo = todos.find((todo, index) => index === todoIndex);

      // const todo = this.todos.find((todo, index) => index === todoIndex);
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

        // let item = db.collection("todoList");
        // item.get().then(data => {
        //   return data.docs[todoIndex].ref.update({
        //     pinNumber: todo.pinNumber
        //   })
        //   .then(() => {
        //     this.todos[todoIndex].pinNumber = todo.pinNumber;
        //   })
        // })
      } else {
        todo.pinNumber = 0;
        this.decreaseNumber += 1;
        // let item = db.collection("todoList");
        // item.get().then(data => {
        //   return data.docs[todoIndex].ref.update({
        //     pinNumber: todo.pinNumber
        //   })
        //   .then(() => {
        //     this.todos[todoIndex].pinNumber = todo.pinNumber;
        //   })
        // })
        // this.todos = this.sortByIndex(this.todos);

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
      // this.todos.push(data);
      // localStorage.setItem(TODO_LOCAL_STORAGE, JSON.stringify(this.todos));

      db.collection("todoList").add(data)
      .then(() => {
        this.todos.push(data);
      })
      .catch(e => {
        console.log(e);
      })
    },
    handleDone(id){
      let index = this.todos.findIndex(todo => todo.id === id);
      // this.todos[index].todoStatus = 2;
      // localStorage.setItem(TODO_LOCAL_STORAGE, JSON.stringify(this.todos));
      
      let item = db.collection("todoList").where("id","==",id);
      item.get().then(data => {
        return data.docs[0].ref.update({
          todoStatus: 2
        })
        .then(() => {
          this.todos[index].todoStatus = 2;
        })
      })
    },
    handleCheck(id){
      let index = this.todos.findIndex(todo => todo.id === id);

      //this.todos[index].isChecked = !this.todos[index].isChecked;
      //localStorage.setItem(TODO_LOCAL_STORAGE, JSON.stringify(this.todos));

      let item = db.collection("todoList").where("id","==",id);
      item.get().then(data => {
        return data.docs[0].ref.update({
          isChecked: !data.docs[0].data().isChecked
        })
        .then(() => {
          this.todos[index].isChecked = !data.docs[0].data().isChecked;
        })
      })
    }
  }
}
</script>

<style>
</style>
