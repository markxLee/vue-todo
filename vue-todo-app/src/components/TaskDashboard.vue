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
  import { getAllTasks, createUser } from '../services/TaskService'
  import createTask from './CreateTask.vue'
  import listTasks from './ListTasks.vue'
  import Task from '../classes/Task.js'

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
      userCreate(data) {
        console.log('data:::', data)
        createUser(data).then(response => {
          console.log(response);
          this.getAllTasks();
        });
      },

      doneTask(id) {
        this.tasks.forEach(v => {
          if(v.id == id) {
            v.status = 1
            v.pin = 0
          }
        })
        this.saveLocalStorage();
      },

      removeTask(id) {
        this.tasks = this.tasks.filter(v => v.id != id)
        this.saveLocalStorage();

      },

      pinTask(id) {
        this.tasks.forEach(v => {
          if(v.id == id)
            v.pin = 1
        })
        this.sortTask()
        this.saveLocalStorage();
      },

      unpinTask(id) {
        this.tasks.forEach(v => {
          if(v.id == id)
            v.pin = 0
        })
        this.sortTask()
        this.saveLocalStorage();
      },

      createTask(name, content) {
        let maxId = Math.max.apply(Math, this.tasks.map(function(o) { return o.id; })) + 1
        this.tasks.push(new Task(maxId, name, content, 0, 0));
        this.saveLocalStorage()
      },

      sortTask()
      {
        let tasks1 = this.tasks.filter(t => t.pin !=0)
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
      },

      loadServerStorage() {
        this.tasks = []
      }
    },
    mounted () {
      this.getTasks();
    }
  }
  
</script>
