<template>
    <v-container class="todo-container">
      <v-row class="mt-3">
        <v-col class="col-sm-2 justify-start">
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
                v-for="(item) in items"
                :key="item.id + Math.random()"
                @click="handleSelect(item.title, item.id)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col class="col-sm-10 justify-end">
          <Input
            class="mr-3"
            :disabled="idData !== 1 ? true : false"
            @content="addTodoItem"
          />
        </v-col>
      </v-row>
      <v-row v-show="titleList" class="list-title ma-0">My {{ titleList }}</v-row>
      <v-card class="mx-auto" elevation="0">
        <Todo
          v-for="(todo) in listTodo"
          v-show="!reveal"
          :key="todo.id + Math.random()"
          :todo="todo"
          @clicked-done="doneTodoItem(todo)"
          @clicked-checked="checkTodoItem(todo)"
          @clicked-delete="removeTodoItem(todo)"
          @clicked-pin="pinTodoItem(todo)"
          @editContent="editTodoItem"
        />
        <v-card v-show="!reveal && listTodo.length === 0" class="text-center">No data available!</v-card>
        <v-expand-transition>
          <v-card
            v-if="reveal"
            class="transition-fast-in-fast-out v-card--reveal"
          >
            <DeletedList
              v-for="(item, index) in listDeleted"
              :key="index + Math.random()"
              :item="item"
              @clicked-restore="restoreItem(item)"
            />
            <v-card v-show="reveal && listDeleted.length === 0" class="text-center">No data available!</v-card>
          </v-card>
        </v-expand-transition>
      </v-card>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import DeletedList from '../../components/DeletedList.vue'
import Input from '../../components/Input.vue'
import Todo from '../../components/Todo.vue'

declare interface Item {
  id: number;
  content: string;
  checked: boolean;
  done: boolean;
  pinTask: boolean;
  isEditable: boolean;
  _created: Date;
  _updated: Date;
}

export default Vue.extend({
  name: 'Home',
  components: {
    Input,
    Todo,
    DeletedList
  },
  data: () => ({
    histories: [] as Item[],
    listTodo: [] as Item[],
    listDeleted: [] as Item[],
    items: [
      { title: 'Todo List', id: 1 },
      { title: 'Recycle Bin', id: 2 }
    ],
    titleList: 'Todo List',
    idData: 1,
    reveal: false
  }),
  watch: {
    histories (list) {
      localStorage.histories = JSON.stringify(list)
    },
    listTodo (newListTodo) {
      localStorage.listTodo = JSON.stringify(newListTodo)
    },
    listDeleted (newListDeleted) {
      localStorage.listDeleted = JSON.stringify(newListDeleted)
    }
  },
  mounted () {
    if (localStorage.histories) {
      this.histories = JSON.parse(localStorage.histories)
    }
    if (localStorage.listTodo) {
      this.listTodo = JSON.parse(localStorage.listTodo)
    }
    if (localStorage.listDeleted) {
      this.listDeleted = JSON.parse(localStorage.listDeleted)
    }
  },
  methods: {
    checkTodoItem (todo: Item) {
      todo.checked = !todo.checked
      localStorage.listTodo = JSON.stringify(this.listTodo)
    },
    addTodoItem (content: string) {
      const todoObject: Item = {
        id: this.histories.length + 1,
        content,
        checked: false,
        done: false,
        pinTask: false,
        isEditable: false,
        _created: new Date(),
        _updated: new Date()
      }
      this.listTodo.push(todoObject)
      this.histories.push(todoObject)
    },
    editTodoItem (editContent: string, id: number, updated: Date) {
      const index = this.listTodo.findIndex((item: Item) => item.id === id)
      this.listTodo[index] = { ...this.listTodo[index], content: editContent, isEditable: false, _updated: updated }
      localStorage.listTodo = JSON.stringify(this.listTodo)
    },
    doneTodoItem (todo: { id: number; done: boolean; pinTask: boolean }) {
      todo.done = !todo.done
      const index = this.listTodo.findIndex(
        (item: Item) => item.id === todo.id
      )
      const item = this.listTodo.filter(
        (item: Item) => item.id === todo.id
      )[0]
      if (todo.done && !todo.pinTask) {
        this.listTodo.splice(index, 1)
        this.listTodo.splice(this.listTodo.length, 0, item)
      }
      localStorage.listTodo = JSON.stringify(this.listTodo)
    },
    removeTodoItem (todo: Item) {
      const deletedItem = this.listTodo.filter(
        (item: Item) => item.id === todo.id
      )[0]
      const newList = this.listTodo.filter(
        (item: Item) => item.id !== todo.id
      )
      if (todo.pinTask === false) {
        this.listDeleted.push(deletedItem)
      } else {
        const newDelete = [deletedItem, ...this.listDeleted]
        this.listDeleted = newDelete
      }
      this.listTodo = newList
    },
    pinTodoItem (todo: Item) {
      const pinFlg = todo.pinTask
      const doneFlg = todo.done
      const index = this.listTodo.findIndex(
        (item: { id: number }) => item.id === todo.id
      )
      const itemPin = this.listTodo.filter(
        (item: { id: number }) => item.id === todo.id
      )[0]
      const unpinIndex = this.listTodo.findIndex((item) => item.pinTask === false)
      this.listTodo.splice(index, 1)
      if (!pinFlg) {
        this.listTodo.splice(0, 0, itemPin)
      } else if (pinFlg && !doneFlg) {
        this.listTodo.splice(unpinIndex - 1, 0, itemPin)
      } else {
        this.listTodo.splice(this.listTodo.length, 0, itemPin)
      }
      todo.pinTask = !pinFlg
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
    restoreItem (item: Item) {
      const newList = this.listDeleted.filter(
        (deletedItem: { id: number }) => deletedItem.id !== item.id
      )
      this.listDeleted = newList
      if (item.pinTask === false) {
        this.listTodo.push(item)
      } else {
        const newTodo = [item, ...this.listTodo]
        this.listTodo = newTodo
      }
    }
  }
})
</script>
