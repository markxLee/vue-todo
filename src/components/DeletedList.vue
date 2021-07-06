<template>
  <v-list-item class="todo">
    <v-checkbox
      v-model="checked"
      color="teal"
      disabled
      :value="this.checked"
    ></v-checkbox>
    <div :class="{ 'todo__title--done': this.done }" class="todo__title">
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
      v-on:click="handleRestore"
      v-show="this.checked"
    >
      <v-icon dark>mdi-restore</v-icon>
    </v-btn>
  </v-list-item>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'DeletedList',
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
    }
  },
  methods: {
    handleRestore () {
      this.$emit('clicked-restore')
    }
  }
})
</script>
