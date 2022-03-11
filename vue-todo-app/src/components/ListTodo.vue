<template>
  <v-container>
    <createTask></createTask>
    <v-list
      flat
      subheader
      three-line
    >
      <v-subheader bold-text>List Todo</v-subheader>

      <v-list-item-group
        v-model="settings"
        multiple
        active-class=""
      >
        <v-list-item v-for="task in tasks" :key="task.id" v-bind:disabled="task.status == 1 ? true : false">
          <template v-slot:default="{ active }" >
            <v-list-item-action>
              <v-checkbox :input-value="task.status == 1 || active ? true : false"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title :class="task.status == 1 ? 'text-decoration-line-through' : ''">{{ task.name }}</v-list-item-title>
              <v-list-item-subtitle :class="task.status == 1 ? 'text-decoration-line-through' : ''">{{ task.content }}</v-list-item-subtitle>
            </v-list-item-content>
        
            <v-btn v-if="active"
              tile
              color="error"
              @click=removeTask(task.id)
            >
              <v-icon left>
                mdi-delete
              </v-icon>
              Remove
            </v-btn>
            <v-btn v-if="active"
              tile
              color="success"
              @click=doneTask(task.id)
            >
              <v-icon left>
                mdi-check
              </v-icon>
              Done
            </v-btn>
          </template>
        </v-list-item>

      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
  import { getAllTasks, createUser } from '../services/TaskService'
 import createTask from './CreateTask.vue'

  export default {
    name: 'ListTodo',
    components: {
      createTask
    },

    data: () => ({
      tasks: [],
      numberOfTasks: 0,
    }),
    methods: {
      getTasks() {
        getAllTasks().then(response => {
          console.log(response)
          this.tasks = response
          this.numberOfTasks = this.tasks.length
        })
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
          }
        })
        console.log(this.tasks)
      },

      removeTask(id) {
        this.tasks = this.tasks.filter(v => v.id != id)
      }
    },
    mounted () {
      this.getTasks();
    }
  }
  
</script>
