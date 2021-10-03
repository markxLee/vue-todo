<template>
  <div class="home">
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

    <!-- App body -->
    <v-card height="auto" width="600" class="pa-4" :elevation="6">
      <todo-item :task="currentTask || {}"></todo-item>
    </v-card>
  </div>
</template>

<script>
import TodoItem from '~/components/todo/TodoItem.vue'

export default {
  components: {
    TodoItem,
  },
  computed: {
    currentTask() {
      return this.$store.getters['todoLocalStorage/getCurrentTask']
    },
  },
  created() {
    this.$store.dispatch('todoLocalStorage/setCurrentTaskRef', {
      id: this.$route.params.id,
    })
  },
}
</script>
