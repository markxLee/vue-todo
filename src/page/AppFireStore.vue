<template>
  <v-app class="d-flex justify-content">
    <v-container>
      <v-card>
        <v-card-title class="display-1">TODO LIST - FIRE STORE</v-card-title>
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
import InputItem from '../components/FireStore/InputItem.vue'
import TodoList from '../components/FireStore/TodoList.vue'
import db from '../firebase';

export default {
  name: 'App',
  components: {
    TodoList,
    InputItem,
  },
  created() {
    db.collection("todoList").orderBy("index", "asc").get()
    .then(docs => {
      docs.forEach(doc => {
        if(doc.exists){
          this.todos.push({
            id: doc.id,
            ...doc.data()
          })
        }
      })
    })
    ;
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
      let todoRef = db.collection("todoList");
      todoRef.doc(id).delete()
      .then (() => this.todos.splice(index, 1));
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

        this.todos[index].pinNumber = todo.pinNumber
        let todoRef = db.collection("todoList");
        todoRef.doc(id).update({pinNumber: todo.pinNumber})
      } else {
        todo.pinNumber = 0;

        this.todos[index].pinNumber = todo.pinNumber
        let todoRef = db.collection("todoList");
        todoRef.doc(id).update({pinNumber: todo.pinNumber})
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
    handleAdd(data){
      const todos = [...this.todos]
      todos.forEach((todo, index) => {
        if(todo.pinNumber !== 0) {
          todos[index].pinNumber++;
        }
      });
      this.todos = todos;
      
      db.collection("todoList").add(data)
      .then((res) => {
        this.todos.push({...data, id: res.id })
      })
      .catch(e => console.log(e))
    },
    handleDone(id){
      let index = this.todos.findIndex(todo => todo.id === id);
      let todoRef = db.collection("todoList");
      todoRef.doc(id).update({
        todoStatus: 2
      })
      .then (() => this.todos[index].todoStatus = 2)
    },
    handleCheck(id){
      let index = this.todos.findIndex(todo => todo.id === id);
      let todoRef = db.collection("todoList");
      todoRef.doc(id).update({
        isChecked: !this.todos[index].isChecked
      })
      .then (() => this.todos[index].isChecked = !this.todos[index].isChecked)
    }
  }
}
</script>

<style>
</style>
