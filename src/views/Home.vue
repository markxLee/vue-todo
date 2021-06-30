<template>
  <v-row>
    <v-col sm="12" md="4">
      <todo-form />
    </v-col>
    <v-col  sm="12"  md="4">
      <todo-card
        v-for="(todo, index) in todos"
        :key="todo.id"
        :todo="todo"
        :class="index > 0 ? 'mt-5' : ''"
      >
        <template #actions="{todo: contextTodo, selected}">
          <transition-group name="fade" mode="out-in">
            <v-icon
              :color="contextTodo.isPined ? 'yellow darken-2' : ''"
              @click="
                contextTodo.isPined
                  ? unpin(contextTodo.originalIndex)
                  : pinToTop(contextTodo.originalIndex)
              "
              key="pin"
            >
              mdi-alert-octagon
            </v-icon>
            <v-icon
              color="red darken-2"
              @click="remove(contextTodo.originalIndex)"
              v-if="selected"
              key="remove"
            >
              mdi-delete-circle
            </v-icon>
            <v-icon
              color="green darken-2"
              @click="changeStatus(contextTodo.originalIndex)"
              v-if="selected"
              key="done"
            >
              mdi-check-underline-circle
            </v-icon>
          </transition-group>
        </template>
      </todo-card>
    </v-col>
    <v-col  sm="12"  md="4">
      <todo-card
        v-for="(todo, index) in doneTodos"
        :key="index"
        :todo="todo"
        :class="index > 0 ? 'mt-5' : ''"
        :disable="true"
      >
        <template #content="{todo}">
          <span class="text-decoration-line-through">
            {{ todo.content }}
          </span>
        </template>
      </todo-card>
    </v-col>
  </v-row>
</template>

<script>
import TodoForm from "@/components/TodoForm";
import TodoCard from "@/components/TodoCard";
import { uuid } from "vue-uuid";
export default {
  name: "Home",
  components: {
    TodoForm,
    TodoCard
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("initTodo");
  },
  destroyed() {
    this.$store.dispatch("saveToLocalStorage");
  },
  computed: {
    todos() {
      return this.$store.getters.todos;
    },
    doneTodos() {
      return this.$store.getters.doneTodos;
    }
  },
  methods: {
    getKey() {
      const id = uuid.v1();
      console.log("get id", id);
      return id;
    },
    remove(index) {
      this.$store.dispatch("deleteTodo", index);
    },
    changeStatus(index) {
      this.$store.dispatch("changeStatus", { index, status: "done" });
    },
    pinToTop(index) {
      this.$store.dispatch("pinToTop", index);
    },
    unpin(index) {
      this.$store.dispatch("unpin", index);
    }
  }
};
</script>
<style scoped>
.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
