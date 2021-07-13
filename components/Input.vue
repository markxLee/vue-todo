<template>
  <v-text-field
    class="input"
    placeholder="Please input your task's content"
    outlined
    color="teal"
    solo
    v-model="content"
    append-icon="mdi-send"
    @keydown.enter="pushContent"
    @click:append="pushContent"
    :disabled="disabled === true"
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
