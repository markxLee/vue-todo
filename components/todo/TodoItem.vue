<template>
  <v-list-item
    class="elevation-2 rounded todo-item"
    @click="goToItemPage"
    @dblclick="editTask()"
  >
    <!-- Complete todo -->
    <v-list-item-action class="mx-0">
      <v-btn icon @click="completeTask">
        <v-icon v-if="!task.isCompleted" color="grey lighten-1">
          mdi-radiobox-blank
        </v-icon>
        <v-icon v-else color="yellow darken-3"> mdi-radiobox-marked </v-icon>
      </v-btn>
    </v-list-item-action>

    <!-- Todo content -->
    <v-list-item-content>
      <v-text-field
        v-if="isEditing"
        v-model="editedContent"
        autofocus
        hide-details
        outlined
        color="yellow darken-3"
        class="ma-0 pa-0"
        @keydown.enter="updateTask"
        @keydown.esc="cancelEdit"
        @blur="cancelEdit"
      />
      <v-list-item-title
        v-else
        :class="{ done: task.isCompleted }"
        v-text="task.content"
      ></v-list-item-title>
    </v-list-item-content>

    <!-- Pin todo -->
    <v-list-item-action>
      <v-btn icon @click="pinTask">
        <v-icon v-if="!task.isPin" color="grey lighten-1">
          mdi-star-outline
        </v-icon>
        <v-icon v-else color="yellow darken-3"> mdi-star </v-icon>
      </v-btn>
    </v-list-item-action>

    <!-- Delete todo -->
    <v-list-item-action>
      <v-btn icon @click="deleteTask">
        <v-icon color="grey lighten-1">mdi-close</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { TODO } from '~/constants/todo.js'

export default {
  name: 'TodoItem',
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    },
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      editedContent: '',
    }
  },
  computed: {
    STORAGE_MODE() {
      return TODO.STORAGE_MODE
    },
    storageMode() {
      return this.$store.getters['todoController/getStorageMode']
    },
    storeName() {
      if (this.storageMode === this.STORAGE_MODE.LOCAL_STORAGE) {
        return 'todoLocalStorage'
      }
      if (this.storageMode === this.STORAGE_MODE.FIREBASE) {
        return 'todoFirebase'
      }
      return ''
    },
  },
  methods: {
    completeTask(event) {
      event.stopPropagation()
      this.$store.dispatch(`${this.storeName}/completeTask`, {
        task: this.task,
      })
    },
    pinTask(event) {
      event.stopPropagation()
      this.$store.dispatch(`${this.storeName}/pinTask`, { task: this.task })
    },
    deleteTask(event) {
      event.stopPropagation()
      this.$store.dispatch(`${this.storeName}/deleteTask`, { task: this.task })
      this.$router.push(`/${this.storeName}`)
    },
    editTask() {
      this.isEditing = true
      this.editedContent = this.task.content
    },
    updateTask() {
      this.isEditing = false
      this.$store.dispatch(`${this.storeName}/updateTask`, {
        task: this.task,
        newContent: this.editedContent,
      })
    },
    cancelEdit() {
      this.isEditing = false
      this.editedContent = ''
    },
    goToItemPage() {
      // Getting bug in localStorage when complet, edit, pin or delete
      // this.$router.push(`/${this.storeName}/${this.task.id}`)
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
