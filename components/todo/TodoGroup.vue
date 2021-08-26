<template>
  <v-list v-if="taskList.length > 0" class="pa-0 mt-2">
    <!-- Group header -->
    <v-btn text class="text-none pa-0 px-2" @click="toggleExpandTaskList()">
      <v-icon v-if="isExpandTaskList" color="yellow darken-3">
        mdi-chevron-down
      </v-icon>
      <v-icon v-else color="yellow darken-3"> mdi-chevron-right </v-icon>
      <h3>{{ groupHeader }}: {{ taskList.length }}</h3>
    </v-btn>

    <!-- Todo list -->
    <div v-show="isExpandTaskList">
      <todo-item
        v-for="task in taskList"
        :key="task.id"
        :task="task"
        class="mt-1"
      ></todo-item>
    </div>
  </v-list>
</template>

<script>
import TodoItem from '~/components/todo/TodoItem.vue'

export default {
  name: 'TodoGroup',
  components: {
    TodoItem,
  },
  props: {
    groupHeader: {
      type: String,
      required: true,
    },
    taskList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isExpandTaskList: true,
    }
  },
  methods: {
    toggleExpandTaskList() {
      this.isExpandTaskList = !this.isExpandTaskList
    },
  },
}
</script>
