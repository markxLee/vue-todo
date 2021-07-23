<template>
  <v-list-item class="todo border">
    <v-checkbox
      v-model="isChecked"
      color="teal"
      disabled
      :value="isChecked"
    ></v-checkbox>
    <v-col :class="{ 'todo__content--done': item.done }" class="todo__content">
      {{ item.content }}
    </v-col>
    <v-spacer />
    <v-btn
      v-show="isChecked"
      class="todo__action mr-2 material-icons"
      color="green"
      icon
      small
      elevation="2"
      plain
      @click="handleRestore"
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
    item:{
      type: Object,
      required: true
    }
  },
    data(){
    return {
      isChecked: this.item.checked
    }
  },
  methods: {
    handleRestore () {
      this.$emit('clicked-restore')
    }
  }
})
</script>
