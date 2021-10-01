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
      <v-radio-group v-model="isFireBaseMode" row readonly>
        <v-radio
          label="Local Storage"
          :value="false"
          @click="$router.push('todoLocalStorage')"
        ></v-radio>
        <v-radio label="Realtime Database" :value="true"></v-radio>
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
    return {
      storageMode: '0',
    }
  },
  head: {
    title: 'Todo',
  },
  computed: {
    tasks() {
      return this.$store.getters['todo/getTasks']
    },
    taskGroups() {
      return [
        {
          groupHeader: 'Important tasks',
          taskList: this.$store.getters['todo/getImportantTasks'] || [],
        },
        {
          groupHeader: 'Current tasks',
          taskList: this.$store.getters['todo/getCurrentTasks'] || [],
        },
        {
          groupHeader: 'Completed tasks',
          taskList: this.$store.getters['todo/getCompletedTasks'] || [],
        },
      ]
    },
    STORAGE_MODE() {
      return {
        LOCAL_STORAGE: '0',
        REALTIME_DATABASE: '1',
      }
    },
    isFireBaseMode() {
      return this.$store.getters['todo/getIsFireBaseMode']
    },
  },
  beforeMount() {
    this.initialSettingForRTDB()
  },
  methods: {
    initialSettingForRTDB() {
      this.$store.dispatch('todo/setFirebaseMode', {
        isFireBaseMode: true,
      })
      this.$store.dispatch('todo/setTasksRef', { isBinding: true })
    },
  },
}
</script>
