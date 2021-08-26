<template>
  <v-list class="pa-0 mt-2">
    <!-- Group header -->
    <v-btn text class="text-none pa-0 px-2" @click="toggleExpandTaskList()">
      <v-icon v-if="isExpandTaskList" color="yellow darken-3">
        mdi-chevron-down
      </v-icon>
      <v-icon v-else color="yellow darken-3"> mdi-chevron-right </v-icon>
      <slot name="header"></slot>
    </v-btn>

    <!-- Group item -->
    <div v-show="isExpandTaskList">
      <slot name="body"></slot>
    </div>
  </v-list>
</template>

<script>
export default {
  name: 'TodoGroup',
  data() {
    return {
      isExpandTaskList: true,
    }
  },
  methods: {
    toggleExpandTaskList() {
      this.isExpandTaskList = !this.isExpandTaskList
    },
  },
}
</script>
