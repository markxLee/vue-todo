<template>
  <v-container>
    <v-card color="basil">
      <v-card-title class="text-center justify-center">
        <h5 class="font-weight-bold text-h5 basil--text">
          TASKS MANAGEMENT
        </h5>
      </v-card-title>
      <v-tabs
        v-model="tab"
        background-color="transparent"
        color="basil"
        grow
      >
        <v-tab
          v-for="tab in tabs"
          :key="tab.id"
          @click="changeTab(tab.id)"
        >
          {{ tab.text }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="tab in tabs"
          :key="tab.id"
        >
          <v-card class="pa-3"
            color="basil"
            flat
          >
            <createTask @createTask="createTask"></createTask>
            <listTasks :tasks="tasks" @doneTask="doneTask" @removeTask="removeTask" @pinTask="pinTask" @unpinTask="unpinTask"></listTasks>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
  import { getAllTasks, createUser, getTasks, deleteTask, updateTask } from '../services/TaskService'
  import createTask from './CreateTask.vue'
  import listTasks from './ListTasks.vue'
  import Task from '../classes/Task.js'
  import db from '@/firestore'

  export default {
    name: 'ListTodo',
    components: {
      createTask, listTasks
    },

    data: () => ({
      tasks: [],
      numberOfTasks: 0,
      tab: null,
      currentTab: 1,
      tabs: [
        {'id' : 1, 'text': 'LOCAL STORAGE'}, {'id': 2, 'text': 'FIREBASE'}, {'id': 3, 'text': 'SERVER (NODEJS)'}
      ],
    }),
    methods: {
      getTasks() {
        if(this.currentTab == 1)
        {
          this.loadLocalStorage()
        }
        // getAllTasks().then(response => {
        //   console.log(response)
        //   this.tasks = response
        //   this.numberOfTasks = this.tasks.length
        //   this.sortTask()
        // })
      },

      notUse() {
        getAllTasks()
      },

      userCreate(data) {
        console.log('data:::', data)
        createUser(data).then(response => {
          console.log(response);
          this.getAllTasks();
        });
      },

      doneTask(id) {
        let task = null

        this.tasks.forEach(v => {
          if(v.id == id) {
            v.status = 1
            v.pin = 0
            task = v
          }
        })
        this.sortTask()
        if(this.currentTab == 1)
          this.saveLocalStorage();
        else if(this.currentTab == 2)
        {
          updateTask(id, {...task})
        }
      },

      removeTask(id) {
        this.tasks = this.tasks.filter(v => v.id != id)
        if(this.currentTab == 1)
          this.saveLocalStorage();
        else if(this.currentTab == 2)
          deleteTask(id)
      },

      pinTask(id) {
        console.log(id)
        let task = null
        let maxPin = Math.max.apply(Math, this.tasks.map(function(o) { return o.pin; })) + 1
        this.tasks.forEach(v => {
          if(v.id == id)
          {
            v.pin = maxPin
            task = v
          }
        })
        console.log(task)
        this.sortTask()
        if(this.currentTab == 1)
          this.saveLocalStorage();
        else if(this.currentTab == 2) {
          updateTask(id, {...task})
        }
      },

      unpinTask(id) {
        let task = null;

        this.tasks.forEach(v => {
          if(v.id == id) { 
            v.pin = 0
            task = v
          }
        })
        this.sortTask()
        if(this.currentTab == 1) {
          this.saveLocalStorage();
        }
        else if(this.currentTab == 2) {
          updateTask(id, {...task})
        }
      },

      createTask(name, content) {
          let maxId = this.uid()//Math.max.apply(Math, this.tasks.map(function(o) { return o.id; })) + 1
          let newTask = new Task(maxId, name, content, 0, 0)
        if(this.currentTab == 1) {
          this.tasks.push(newTask);
          this.saveLocalStorage()
        }
        else if(this.currentTab == 2) {
          db.collection('tasks').add({...newTask});
          this.loadFirebaseStorage()
        }
      },

      sortTask()
      {
        let tasks1 = this.tasks.filter(t => t.pin !=0).sort((a, b) => parseInt(a.pin) - parseInt(b.pin));
        let tasks2 = this.tasks.filter(t => t.pin == 0)
        this.tasks = tasks1.concat(tasks2)
      },

      changeTab(id) {
        this.currentTab = id
        if(id == 1)
          this.loadLocalStorage()
        else if(id == 2)
          this.loadFirebaseStorage()
        else
          this.loadServerStorage()
      },

      saveLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      },

      loadLocalStorage() {
        this.tasks = []
        this.tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        console.log(this.tasks);
      },

      loadFirebaseStorage() {
        this.tasks = []
        getTasks().then(response => {
          console.log(response)
          this.tasks = response
          this.sortTask()
        })
      },

      loadServerStorage() {
        this.tasks = []
      },

      uid() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
      }
    },
    mounted () {
      this.getTasks();
    }
  }
  
</script>
