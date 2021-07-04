<template>
  <v-list v-if="taskList.length > 0" class="pa-0 pt-2">
    <!-- Group header -->
    <v-btn text class="text-none pa-0" @click="toggleExpandTaskList()">
      <v-icon v-if="isExpandTaskList" color="yellow darken-3">
        mdi-chevron-down
      </v-icon>
      <v-icon v-else color="yellow darken-3"> mdi-chevron-right </v-icon>
      <h3>{{ groupHeader }}: {{ taskList.length }}</h3>
    </v-btn>

    <!-- Todo list -->
    <div v-if="isExpandTaskList">
      <v-list-item
        class="elevation-2 mt-1 rounded todo-item"
        v-for="task in taskList"
        :key="task.id"
      >
        <!-- Complete todo -->
        <v-list-item-action class="mx-0">
          <v-btn icon @click="completeTask(task.id)">
            <v-icon v-if="!task.isCompleted" color="grey lighten-1">
              mdi-radiobox-blank
            </v-icon>
            <v-icon v-else color="yellow darken-3">
              mdi-radiobox-marked
            </v-icon>
          </v-btn>
        </v-list-item-action>

        <!-- Todo content -->
        <v-list-item-content>
          <v-text-field
            v-if="task.isEditing"
            v-model="task.content"
            autofocus
            hide-details
            outlined
            color="yellow darken-3"
            class="ma-0 pa-0"
            @keydown.enter="completeEdit(task.id)"
            @keydown.esc="cancelEdit(task.id)"
            @blur="cancelEdit(task.id)"
          />
          <v-list-item-title
            v-else
            v-text="task.content"
            :class="{ done: task.isCompleted }"
            @dblclick="editTask(task.id)"
          ></v-list-item-title>
        </v-list-item-content>

        <!-- Pin todo -->
        <v-list-item-action>
          <v-btn icon @click="pinTask(task.id)">
            <v-icon v-if="!task.isPin" color="grey lighten-1">
              mdi-star-outline
            </v-icon>
            <v-icon v-else color="yellow darken-3"> mdi-star </v-icon>
          </v-btn>
        </v-list-item-action>

        <!-- Delete todo -->
        <v-list-item-action>
          <v-btn icon @click="deleteTask(task.id)">
            <v-icon color="grey lighten-1">mdi-close</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
export default {
  name: 'TodoGroup',
  props: [
    'groupHeader',
    'taskList',
    'completeTask',
    'pinTask',
    'deleteTask',
    'editTask',
    'completeEdit',
    'cancelEdit',
  ],
  data: () => ({
    isExpandTaskList: true,
  }),
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      },
    },
  },
  methods: {
    toggleExpandTaskList: function () {
      this.isExpandTaskList = !this.isExpandTaskList
    },
  },
}
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
.todo-item:hover {
  background-color: #fffbf5;
}
</style>
