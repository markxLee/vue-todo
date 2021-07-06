<template>
  <v-list-item class="todo">
    <v-checkbox
      v-model="checked"
      v-on:click="handleChecked"
      color="teal"
      :disabled="done === true"
      :value="this.checked"
    ></v-checkbox>
    <div
      :class="{
        'todo__title--done': this.done,
        'pin-task': this.pinTask && !this.done,
        'pin-done': this.pinTask && this.done
      }"
      class="todo__title"
    >
      {{ title }}
    </div>
    <v-spacer />
    <v-btn
      class="todo__action mr-2 material-icons"
      color="green"
      icon
      small
      elevation="2"
      plain
      v-model="done"
      v-on:click="handleDoneTask"
      v-show="this.checked"
    >
      <v-icon v-if="!done" dark>mdi-check-outline</v-icon>
      <v-icon v-else dark>mdi-restore</v-icon>
    </v-btn>
    <v-btn
      class="todo__action mr-2"
      color="error"
      icon
      small
      elevation="2"
      plain
      v-on:click="handleDeleteTask"
      v-show="this.checked"
    >
      <v-icon>mdi-delete-outline</v-icon>
    </v-btn>
    <v-btn
      class="todo__action mr-2 material-icons"
      color="primary"
      icon
      small
      elevation="2"
      plain
      v-on:click="handlePinTask"
      v-show="this.checked"
    >
      <v-icon v-if="this.pinTask === false" dark>mdi-pin-outline</v-icon>
      <v-icon v-else dark>mdi-pin-off-outline</v-icon>
    </v-btn>
  </v-list-item>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Todo',
  props: {
    title: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    checked: {
      type: Boolean,
      required: true,
      default: false
    },
    done: {
      type: Boolean,
      required: true,
      default: false
    },
    pinTask: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    handleChecked () {
      this.$emit('clicked-checked')
    },
    handleDoneTask () {
      this.$emit('clicked-done')
    },
    handleDeleteTask () {
      this.$emit('clicked-delete')
    },
    handlePinTask () {
      this.$emit('clicked-pin')
    }
  }
})
</script>
