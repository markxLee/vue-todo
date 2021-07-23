<template>
  <v-list-item class="todo border">
    <v-checkbox
      v-model="isChecked"
      color="teal"
      :disabled="todo.done === true"
      :value="todo.checked"
      @click="handleChecked"
    ></v-checkbox>
    <v-col
      :class="{
        'todo__content--done': todo.done,
        'pin-task': todo.pinTask && !todo.done,
        'pin-done': todo.pinTask && todo.done
      }"
      class="col-sm-5 todo__content"
    >
      {{ editValue }}
    </v-col>
    <v-col
      :class="{
        'todo__content--done': todo.done,
        'pin-task': todo.pinTask && !todo.done,
        'pin-done': todo.pinTask && todo.done
      }"
      class="todo__content"
    >
      {{ dateFormat(created) }}
    </v-col>
    <v-col
      :class="{
        'todo__content--done': todo.done,
        'pin-task': todo.pinTask && !todo.done,
        'pin-done': todo.pinTask && todo.done
      }"
      class="todo__content"
    >
      {{ dateFormat(updated) }}
    </v-col>
    <v-col>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        left
        offset-x
      >
        <template #activator="{ on, attrs }">
          <v-btn
            v-show="isChecked"
            dark
            v-bind="attrs"
            icon
            color="green"
            :disabled="isDone"
            v-on="on"
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-text-field v-model="editValue" class="ma-3" hide-details="auto" ></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              @click="onCancel"
            >
              Cancel
            </v-btn>
            <v-btn
              color="teal"
              text
              @click="editTodoItem"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
      <v-btn
        v-show="isChecked"
        v-model="isDone"
        class="todo__action mr-2 material-icons"
        color="green"
        icon
        small
        elevation="2"
        plain
        @click="handleDoneTask"
      >
        <v-icon v-if="!todo.done" dark>mdi-check-outline</v-icon>
        <v-icon v-else dark>mdi-restore</v-icon>
      </v-btn>
      <v-btn
        v-show="isChecked"
        class="todo__action mr-2"
        color="error"
        icon
        small
        elevation="2"
        plain
        @click="handleDeleteTask"
      >
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>
      <v-btn
        v-show="isChecked"
        class="todo__action mr-2 material-icons"
        color="primary"
        icon
        small
        elevation="2"
        plain
        @click="handlePinTask"
      >
        <v-icon v-if="todo.pinTask === false" dark>mdi-pin-outline</v-icon>
        <v-icon v-else dark>mdi-pin-off-outline</v-icon>
      </v-btn>
    </v-col>
  </v-list-item>
</template>
<script lang="ts">
import Vue from 'vue'
import moment from 'moment'

export default Vue.extend({
  name: 'Todo',
  props: {
    todo:{
      type: Object,
      required: true
    }
  },
  data(){
    return {
      menu: false,
      isChecked: this.todo.checked,
      editValue: this.todo.content,
      created: this.todo._created,
      updated: this.todo._updated
    }
  },
  computed: {
    isDone() {
      return this.todo.done
    }
  },
  methods: {
    handleChecked () {
      this.$emit('clicked-checked')
    },
    handleDoneTask () {
      this.$emit('clicked-done')
    },
    handleEditTask () {
      this.$emit('clicked-editable')
    },
    handleDeleteTask () {
      this.$emit('clicked-delete')
    },
    handlePinTask () {
      this.$emit('clicked-pin')
    },
    editTodoItem(menu: { altKey: boolean }) {
      this.menu = menu.altKey
      this.updated = new Date()
      this.$emit('editContent', this.editValue, this.todo.id, this.updated )
    },
    onCancel(menu: { altKey: boolean }){
      this.menu = menu.altKey
      this.editValue = this.todo.content
    },
    dateFormat(date: string, format?: string){
      return moment(date).format(format || 'YYYY/MM/DD HH:mm:ss')
    }
  }
})
</script>
