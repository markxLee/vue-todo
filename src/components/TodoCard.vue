<template>
  <v-card
    elevation="2"
    :class="`d-flex justify-space-between align-center px-4 ${hoverClass}`"
  >
    <v-checkbox :disabled="disable" v-model="selected"></v-checkbox>
    <div class="ml-5 flex-grow-1 flex-shrink-0">
      <slot name="content" :todo="todo">
        {{ todo.content }}
      </slot>
    </div>
    <slot name="actions" :todo="todo" :selected="selected"> </slot>
  </v-card>
</template>

<script>
export default {
  props: {
    todo: {
      content: String,
      isPined: Boolean
    },
    disable: Boolean
  },
  data() {
    return {
      selected: false
    };
  },
  computed: {
    hoverClass() {
      return this.selected ? " border-gradient border-gradient-purple" : "";
    }
  },
  created() {
    console.log('created', this.todo.originalIndex)
  },
  updated() {
     console.log('updated', this.todo.originalIndex)
  },
  destroyed() {
    console.log('destroyed', this.todo.originalIndex)
  }
};
</script>

<style scoped>
.border-gradient {
  border: 3px solid;
  border-image-slice: 1;
  border-width: 3px;
}
.border-gradient-purple {
  border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
  border-radius: 10%;
}
</style>
