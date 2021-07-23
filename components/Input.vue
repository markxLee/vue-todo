<template>
  <v-text-field
    v-model="content"
    class="input"
    placeholder="Please input your task's content"
    outlined
    color="teal"
    solo
    append-icon="mdi-send"
    :disabled="disabled === true"
    @keydown.enter="pushContent"
    @click:append="pushContent"
  >
  </v-text-field>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Input',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    content: ''
  }),
  methods: {
    pushContent () {
      if (this.content === '') this.content = 'Todo Item'
      this.$emit('content', this.content)
      this.content = ''
    }
  }
})
</script>
