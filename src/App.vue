<template>
  <div id="app">
    <h1 class="label">VueJs To Do</h1>

    <!-- Important tasks -->
    <h3 v-show="importantTasks.length">
      Important: {{ importantTasks.length }}
    </h3>
    <div class="todo-list" v-for="task in importantTasks" :key="task.id">
      <div>
        <input
          class="todo-checkbox"
          type="checkbox"
          v-model="task.isCompleted"
        />
        <input
          class="atodo-list-item"
          type="text"
          v-model="task.content"
          v-if="task.isEditing"
          v-focus
          @keyup.enter="doneEdit(task)"
          @keyup.esc="cancelEdit(task)"
          @blur="cancelEdit(task)"
        />
        <span
          class="atodo-list-item"
          :class="{ done: task.isCompleted }"
          v-else
          @dblclick="editTask(task)"
          >{{ task.content }}</span
        >
        <input
          class="todo-pin"
          type="checkbox"
          v-model="task.isPin"
          @click="pinTask(task.id)"
        />
        <button class="todo-button--delete" @click="deleteTask(task.id)">
          Delete
        </button>
      </div>
    </div>

    <!-- Current tasks -->
    <h3 v-show="currentTasks.length">
      Current task: {{ currentTasks.length }}
    </h3>
    <div class="todo-list" v-for="task in currentTasks" :key="task.id">
      <div>
        <input
          class="todo-checkbox"
          type="checkbox"
          v-model="task.isCompleted"
        />
        <input
          class="atodo-list-item"
          type="text"
          v-model="task.content"
          v-if="task.isEditing"
          v-focus
          @keyup.enter="doneEdit(task)"
          @keyup.esc="cancelEdit(task)"
          @blur="cancelEdit(task)"
        />
        <span
          class="atodo-list-item"
          :class="{ done: task.isCompleted }"
          v-else
          @dblclick="editTask(task)"
          >{{ task.content }}</span
        >
        <input
          class="todo-pin"
          type="checkbox"
          v-model="task.isPin"
          @click="pinTask(task.id)"
        />
        <button class="todo-button--delete" @click="deleteTask(task.id)">
          Delete
        </button>
      </div>
    </div>

    <!-- Completed tasks -->
    <h3 v-show="completedTasks.length">
      Completed: {{ completedTasks.length }}
    </h3>
    <div class="todo-list" v-for="task in completedTasks" :key="task.id">
      <div>
        <!-- <input
          class="todo-checkbox"
          type="checkbox"
          v-model="task.isCompleted"
        /> -->
        <input
          class="atodo-list-item"
          type="text"
          v-model="task.content"
          v-if="task.isEditing"
          v-focus
          @keyup.enter="doneEdit(task)"
          @keyup.esc="cancelEdit(task)"
          @blur="cancelEdit(task)"
        />
        <span
          class="atodo-list-item"
          :class="{ done: task.isCompleted }"
          v-else
          @dblclick="editTask(task)"
          >{{ task.content }}</span
        >
        <input
          class="todo-pin"
          type="checkbox"
          v-model="task.isPin"
          @click="pinTask(task.id)"
        />
        <button class="todo-button--delete" @click="deleteTask(task.id)">
          Delete
        </button>
      </div>
    </div>

    <!-- New task field -->
    <input
      class="todo-input"
      type="text"
      placeholder="What needs to be done"
      v-model="newTask"
    />
    <button class="todo-button--add" @click="addNewTask()">Add a task</button>

    <!-- Control checkbox -->
    <div>
      <button class="todo-control-button" @click="completeAllTasks()">
        Complete all
      </button>
      <button class="todo-control-button" @click="clearCompletedTasks()">
        Clear completed
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      beforeEditeCache: '',
      newTask: '',
      todoId: 10,
      tasks: [
        {
          id: 0,
          content: 'Di cho mua rau 0',
          isCompleted: false,
          isPin: true,
          isEditing: false,
        },
        {
          id: 1,
          content: 'Di cho mua rau 1',
          isCompleted: false,
          isPin: false,
          isEditing: false,
        },
        {
          id: 2,
          content: 'Di cho mua rau 2',
          isCompleted: false,
          isPin: false,
          isEditing: false,
        },
        {
          id: 3,
          content: 'Di cho mua rau 3',
          isCompleted: true,
          isPin: false,
          isEditing: false,
        },
        {
          id: 4,
          content: 'Di cho mua rau 4',
          isCompleted: true,
          isPin: false,
          isEditing: false,
        },
        {
          id: 5,
          content: 'Di cho mua rau 5',
          isCompleted: true,
          isPin: true,
          isEditing: false,
        },
        {
          id: 6,
          content: 'Di cho mua rau 6',
          isCompleted: false,
          isPin: false,
          isEditing: false,
        },
        {
          id: 7,
          content: 'Di cho mua rau 7',
          isCompleted: false,
          isPin: false,
          isEditing: false,
        },
        {
          id: 8,
          content: 'Di cho mua rau 8',
          isCompleted: true,
          isPin: false,
          isEditing: false,
        },
        {
          id: 9,
          content: 'Di cho mua rau 9',
          isCompleted: true,
          isPin: false,
          isEditing: false,
        },
      ],
    }
  },
  computed: {
    currentTasks: function () {
      return this.tasks.filter((task) => !task.isCompleted && !task.isPin)
    },
    importantTasks: function () {
      return this.tasks.filter((task) => !task.isCompleted && task.isPin)
    },
    completedTasks: function () {
      return this.tasks.filter((task) => task.isCompleted)
    },
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      },
    },
  },
  methods: {
    addNewTask: function () {
      if (this.newTask) {
        this.tasks.push({
          id: this.todoId,
          content: this.newTask,
          isCompleted: false,
          isPin: false,
          isEditing: false,
        })
        this.newTask = ''
        this.todoId += 1
      }
    },
    deleteTask: function (id) {
      const todoIndex = this.tasks.findIndex((task) => task.id === id)
      this.tasks.splice(todoIndex, 1)
    },
    pinTask: function (id) {
      const todoIndex = this.tasks.findIndex((task) => task.id === id)
      this.tasks[todoIndex].isPin = !this.tasks[todoIndex].isPin
    },
    editTask: function (task) {
      this.beforeEditeCache = task.content
      task.isEditing = true
    },
    doneEdit: function (task) {
      if (task.content.trim() === '') {
        task.content = this.beforeEditCache
      }
      task.isEditing = false
    },
    cancelEdit: function (task) {
      this.content = task.beforeEditCache
      task.isEditing = false
    },
    completeAllTasks: function () {
      this.tasks.forEach((task) => (task.isCompleted = true))
    },
    clearCompletedTasks: function () {
      this.tasks = this.tasks.filter((task) => !task.isCompleted)
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}
.done {
  text-decoration: line-through;
}
</style>
