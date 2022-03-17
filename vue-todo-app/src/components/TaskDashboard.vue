<template>
  <v-container>
    <v-card color="basil">
      <v-card-title class="align-center">
        <v-row no-gutters class="align-center">
          <v-col cols="3">
            <h5 class="font-weight-bold text-h5 basil--text">
              TASKS MANAGEMENT
            </h5>
          </v-col>
          <sync-task @syncTask ="syncTask"></sync-task>
        </v-row>
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
  import { getAllTasks, createTaskServer, createTasksServer, updateTaskServer, deleteTaskServer, getTasks, deleteTask, updateTask, addTask } from '../services/TaskService'
  import createTask from './CreateTask.vue'
  import listTasks from './ListTasks.vue'
  import syncTask from './SyncTask.vue'
  import Task from '../classes/Task.js'
  // import db from '@/firestore'

  export default {
    name: 'ListTodo',
    components: {
      createTask, listTasks, syncTask
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

      async syncTask(a, b) {
        if(a==1 && b==2) {
          console.log('Start sync Local to Firebase')
          let lTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
          let fTasks = []
          await getTasks().then(response => {
            fTasks = response
          })
          let mTasks = lTasks.filter(o1 => !fTasks.some(o2 => o1.name === o2.name))
          mTasks.forEach(v => addTask(v))
          // console.log(lTasks);
          // await db.collection('tasks').add(...lTasks);
          console.log('Finish sync Local to Firebase')
        }
        else if(a==1 && b==3) {
          console.log('Start sync Local to Server')
          let lTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
          let sTasks = []
          await getAllTasks().then(response => {
            sTasks = response
          })
          let mTasks = lTasks.filter(o1 => !sTasks.some(o2 => o1.name === o2.name))
          await createTasksServer(mTasks)
          // console.log(lTasks);
          // await db.collection('tasks').add(...lTasks);
          console.log('Finish sync Local to Server')
        }
        else if(a==2 && b==1) {
          console.log('Start sync Firebase to Local')
          let lTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
          let fTasks = []
          await getTasks().then(response => {
            fTasks = response
          })
          let mTasks = fTasks.filter(o1 => !lTasks.some(o2 => o1.name === o2.name))
          let currenTasks = lTasks.concat(mTasks)
          localStorage.setItem("tasks", JSON.stringify(currenTasks))
          // console.log(lTasks);
          // await db.collection('tasks').add(...lTasks);
          console.log('Finish sync Firebase to Local')
        }
        else if(a==2 && b==3) {
          console.log('Start sync Firebase to Server')
          let sTasks = []
          await getAllTasks().then(response => {
            sTasks = response
          })
          let fTasks = []
          await getTasks().then(response => {
            fTasks = response
          })
          let mTasks = fTasks.filter(o1 => !sTasks.some(o2 => o1.name === o2.name))
          await createTasksServer(mTasks)
          // console.log(lTasks);
          // await db.collection('tasks').add(...lTasks);
          console.log('Finish sync Firebase to Server')
        }
        else if(a==3 && b==1) {
          console.log('Start sync Server to Local')
          let sTasks = []
          await getAllTasks().then(response => {
            sTasks = response
          })
          let lTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

          let mTasks = sTasks.filter(o1 => !lTasks.some(o2 => o1.name === o2.name))
          let currenTasks = lTasks.concat(mTasks)
          localStorage.setItem("tasks", JSON.stringify(currenTasks))
          // console.log(lTasks);
          // await db.collection('tasks').add(...lTasks);
          console.log('Finish sync Server to Local')
        }
        else if(a==3 && b==2) {
          console.log('Start sync Server to Firebase')
          let sTasks = []
          await getAllTasks().then(response => {
            sTasks = response
          })
          let fTasks = []
          await getTasks().then(response => {
            fTasks = response
          })
          let mTasks = sTasks.filter(o1 => !fTasks.some(o2 => o1.name === o2.name))
          mTasks.forEach(v => addTask(v))
          // console.log(lTasks);
          // await db.collection('tasks').add(...lTasks);
          console.log('Finish sync Server to Firebase')
        }

        this.changeTab(this.currentTab)
      },

      userCreate(data) {
        console.log('data:::', data)
        createTaskServer(data).then(response => {
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
        else {
          updateTaskServer(task._id, task)
        }
      },

      async removeTask(id) {
        if(this.currentTab == 1)
        {
          this.saveLocalStorage();
          this.tasks = this.tasks.filter(v => v.id != id)

        }
        else if(this.currentTab == 2)
        {
          deleteTask(id)
          this.tasks = this.tasks.filter(v => v.id != id)

        }
        else
        {
          if(await deleteTaskServer(this.tasks.find(e => e.id === id)?._id))
            this.tasks = this.tasks.filter(v => v.id != id)
        }
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
        else {
          updateTaskServer(task._id, task)
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
        else {
          updateTaskServer(task._id, task)
        }
      },

      async createTask(name, content) {
          let maxId = this.uid()//Math.max.apply(Math, this.tasks.map(function(o) { return o.id; })) + 1
          let newTask = new Task(maxId, name, content, 0, 0)
        if(this.currentTab == 1) {
          this.tasks.push(newTask);
          this.saveLocalStorage()
        }
        else if(this.currentTab == 2) {
          addTask({...newTask})
          // db.collection('tasks').add({...newTask});
          this.loadFirebaseStorage()
        }
        else {
          let rs = await createTaskServer({...newTask})
          if(typeof rs == 'object')
            this.tasks.push(rs)
          else
            alert('Error')
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
        getAllTasks().then(response => {
          this.tasks = response
          this.sortTask()
          console.log(this.tasks)
        })
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
<style>
  /* .v-label {
    font-size: smaller
  } */
</style>
