<template>
  <v-container>
    <!-- App name -->
    <div
      class="
        text-center
        display-3
        font-weight-medium
        my-10
        yellow--text
        text--darken-3
      "
    >
      Vue Todo
    </div>

    <!-- Storage mode -->
    <div class="d-flex justify-end">
      <v-radio-group v-model="storageMode" row readonly>
        <v-radio
          label="Local Storage"
          :value="STORAGE_MODE.LOCAL_STORAGE"
          @click="changeStorageMode(STORAGE_MODE.LOCAL_STORAGE)"
        ></v-radio>
        <v-radio
          label="Realtime Database"
          :value="STORAGE_MODE.FIREBASE"
          @click="changeStorageMode(STORAGE_MODE.FIREBASE)"
        ></v-radio>
      </v-radio-group>
    </div>

    <!-- App body -->
    <v-card height="auto" width="600" class="pa-4" :elevation="6">
      <!-- New task field -->
      <todo-input></todo-input>

      <!-- Control button -->
      <todo-control></todo-control>

      <!-- Group todo list -->
      <group-item
        v-for="(taskGroup, index) in taskGroups"
        v-show="taskGroup.taskList.length > 0"
        :key="index"
      >
        <template #header>
          <h3>{{ taskGroup.groupHeader }}: {{ taskGroup.taskList.length }}</h3>
        </template>
        <template #body>
          <todo-item
            v-for="task in taskGroup.taskList"
            :key="task.id"
            :task="task"
            class="mt-1"
          ></todo-item>
        </template>
      </group-item>
    </v-card>
  </v-container>
</template>

<script>
import { TODO } from '~/constants/todo.js'
import TodoInput from '~/components/todo/TodoInput.vue'
import TodoControl from '~/components/todo/TodoControl.vue'
import GroupItem from '~/components/common/GroupItem.vue'
import TodoItem from '~/components/todo/TodoItem.vue'

export default {
  components: {
    TodoInput,
    TodoControl,
    GroupItem,
    TodoItem,
  },
  data() {
    return {}
  },
  head: {
    title: 'Todo',
  },
  computed: {
    STORAGE_MODE() {
      return TODO.STORAGE_MODE
    },
    storageMode() {
      return this.$store.getters['todoController/getStorageMode']
    },
    taskGroups() {
      return [
        {
          groupHeader: 'Important tasks',
          taskList:
            this.$store.getters['todoLocalStorage/getImportantTasks'] || [],
        },
        {
          groupHeader: 'Current tasks',
          taskList:
            this.$store.getters['todoLocalStorage/getCurrentTasks'] || [],
        },
        {
          groupHeader: 'Completed tasks',
          taskList:
            this.$store.getters['todoLocalStorage/getCompletedTasks'] || [],
        },
      ]
    },
  },
  beforeMount() {
    this.loadDataFromLocalStorage()
    window.addEventListener('beforeunload', this.saveDataToLocalStorage)
  },
  beforeDestroy() {
    this.saveDataToLocalStorage()
  },
  methods: {
    loadDataFromLocalStorage() {
      this.$store.dispatch('todoLocalStorage/loadDataFromLocalStorage')
    },
    saveDataToLocalStorage() {
      this.$store.dispatch('todoLocalStorage/saveDataToLocalStorage')
    },
    changeStorageMode(newMode) {
      if (newMode !== this.storageMode) {
        this.$store.dispatch('todoController/setStorageMode', {
          storageMode: newMode,
        })

        if (newMode === this.STORAGE_MODE.LOCAL_STORAGE) {
          this.$router.push('todoLocalStorage')
        }

        if (newMode === this.STORAGE_MODE.FIREBASE) {
          this.$router.push('todoFirebase')
        }
      }
    },
  },
}
</script>
