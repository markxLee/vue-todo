<template>
  <v-list v-if="noteList.length > 0" class="pa-0 mt-2">
    <!-- Group header -->
    <v-btn text class="text-none pa-0 px-2" @click="toggleExpandNoteList()">
      <v-icon v-if="isExpandNoteList" color="yellow darken-3">
        mdi-chevron-down
      </v-icon>
      <v-icon v-else color="yellow darken-3"> mdi-chevron-right </v-icon>
      <h3>{{ groupHeader }}: {{ noteList.length }}</h3>
    </v-btn>

    <!-- Note list -->
    <div v-show="isExpandNoteList">
      <note-item
        v-for="note in noteList"
        :key="note.id"
        :note="note"
        class="mt-1"
      >
      </note-item>
    </div>
  </v-list>
</template>

<script>
import NoteItem from '~/components/note/NoteItem.vue'

export default {
  name: 'NoteGroup',
  components: {
    NoteItem,
  },
  props: {
    groupHeader: {
      type: String,
      required: true,
    },
    noteList: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    isExpandNoteList: true,
  }),
  methods: {
    toggleExpandNoteList() {
      this.isExpandNoteList = !this.isExpandNoteList
    },
  },
}
</script>
