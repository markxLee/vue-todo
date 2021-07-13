<template>
    <v-container class="todo-container">
      <v-row class="mt-3">
        <div class="col col-sm-2 justify-start">
          <v-menu offset-y bottom origin="center" transition="scale-transition">
            <template #activator="{ attrs, on }">
              <v-btn
                color="teal darken-1"
                class="white--text mt-3 mb-3"
                v-bind="attrs"
                v-on="on"
              >
                {{ titleList }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index + Math.random()"
                @click="handleSelect(item.title, item.id)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="col col-sm-10 justify-end">
          <Input
            class="mr-3"
            :disabled="idData !== 1 ? true : false"
            @content="addTodoItem"
          />
        </div>
      </v-row>
      <div v-show="titleList" class="list-title">My {{ titleList }}</div>
      <v-list class="todo__list">
        <v-sheet outlined color="teal" rounded>
          <v-card class="mx-auto" outlined elevation="0">
            <Todo
              v-for="(todo, index) in listTodo"
              v-show="!reveal"
              :id="todo.id"
              :key="index + Math.random()"
              :title="todo.content"
              :checked="todo.checked"
              :done="todo.done"
              :pin-task="todo.pinTask"
              :is-editable="todo.isEditable"
              @clicked-edit="handleEditor(todo)"
              @clicked-done="doneTodoItem(todo)"
              @clicked-checked="checkTodoItem(todo)"
              @clicked-delete="removeTodoItem(todo)"
              @clicked-pin="pinTodoItem(todo)"
            />
            <v-expand-transition>
              <v-card
                v-if="reveal"
                class="transition-fast-in-fast-out v-card--reveal"
              >
                <DeletedList
                  v-for="(item, index) in listDeleted"
                  :id="item.id"
                  :key="index + Math.random()"
                  :title="item.content"
                  :checked="item.checked"
                  :done="item.done"
                  @clicked-restore="restoreItem(item)"
                />
              </v-card>
            </v-expand-transition>
          </v-card>
        </v-sheet>
      </v-list>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import DeletedList from '../../components/DeletedList.vue'
import Input from '../../components/Input.vue'
import Todo from '../../components/Todo.vue'

export default Vue.extend({
  name: 'Home',
  components: {
    Input,
    Todo,
    DeletedList
  },
  data: () => ({
    listTodo: [],
    listDeleted: [],
    items: [
      { title: 'Todo List', id: 1 },
      { title: 'Recycle Bin', id: 2 }
    ],
    titleList: 'Todo List',
    idData: 1,
    reveal: false
  }),
  watch: {
    listTodo (newListTodo) {
      localStorage.listTodo = JSON.stringify(newListTodo)
    },
    listDeleted (newListDeleted) {
      localStorage.listDeleted = JSON.stringify(newListDeleted)
    }
  },
  mounted () {
    if (localStorage.listTodo) {
      this.listTodo = JSON.parse(localStorage.listTodo)
    }
    if (localStorage.listDeleted) {
      this.listDeleted = JSON.parse(localStorage.listDeleted)
    }
  },
  methods: {
    checkTodoItem (todo: { id: number; checked: boolean }) {
      todo.checked = !todo.checked
      localStorage.listTodo = JSON.stringify(this.listTodo)
    },
    addTodoItem (content: string) {
      const todoObject = {
        id: this.listTodo.length + 1,
        content,
        checked: false,
        done: false,
        pinTask: false,
        isEditable: false
      }
      this.listTodo.push(todoObject as never)
    },
    doneTodoItem (todo: { id: number; done: boolean; pinTask: boolean }) {
      todo.done = !todo.done
      const index = this.listTodo.findIndex(
        (item: { id: number }) => item.id === todo.id
      )
      const item = this.listTodo.filter(
        (item: { id: number }) => item.id === todo.id
      )[0]
      if (todo.done && !todo.pinTask) {
        this.listTodo.splice(index, 1)
        this.listTodo.splice(this.listTodo.length, 0, item)
      }
      localStorage.listTodo = JSON.stringify(this.listTodo)
    },
    removeTodoItem (todo: { id: number; pinTask: boolean }) {
      const deletedItem = this.listTodo.filter(
        (item: { id: number }) => item.id === todo.id
      )[0]
      const newList = this.listTodo.filter(
        (item: { id: number }) => item.id !== todo.id
      )
      if (todo.pinTask === false) {
        this.listDeleted.push(deletedItem)
      } else {
        const newDelete = [deletedItem, ...this.listDeleted]
        this.listDeleted = newDelete
      }
      this.listTodo = newList
    },
    pinTodoItem (todo: { id: number; done: boolean; pinTask: boolean }) {
      const index = this.listTodo.findIndex(
        (item: { id: number }) => item.id === todo.id
      )
      const itemPin = this.listTodo.filter(
        (item: { id: number }) => item.id === todo.id
      )[0]
      this.listTodo.splice(index, 1)
      if (!todo.pinTask) {
        this.listTodo.splice(0, 0, itemPin as never)
      } else if (todo.pinTask && !todo.done) {
        this.listTodo.splice(todo.id - 1, 0, itemPin as never)
      } else {
        this.listTodo.splice(this.listTodo.length, 0, itemPin as never)
      }
      todo.pinTask = !todo.pinTask
    },
    handleSelect (title: string, id: number) {
      if (id === 1) {
        this.reveal = false
      } else {
        this.reveal = true
      }
      this.titleList = title
      this.idData = id
    },
    restoreItem (item: {
      id: number;
      content: string;
      checked: boolean;
      done: boolean;
      pinTask: boolean;
    }) {
      const newList = this.listDeleted.filter(
        (deletedItem: { id: number }) => deletedItem.id !== item.id
      )
      this.listDeleted = newList
      if (item.pinTask === false) {
        this.listTodo.push(item as never)
      } else {
        const newTodo = [item as never, ...this.listTodo]
        this.listTodo = newTodo
      }
    },
    handleEditor (todo: { isEditable: boolean }) {
      todo.isEditable = true
      localStorage.listTodo = JSON.stringify(this.listTodo)
    }
  }
})
</script>
