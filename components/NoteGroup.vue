<template>
  <v-list v-if="noteList.length > 0" class="pa-0 pt-2">
    <!-- Group header -->
    <v-btn text class="text-none pa-0" @click="toggleExpandNoteList()">
      <v-icon v-if="isExpandNoteList" color="yellow darken-3">
        mdi-chevron-down
      </v-icon>
      <v-icon v-else color="yellow darken-3"> mdi-chevron-right </v-icon>
      <h3>{{ groupHeader }}: {{ noteList.length }}</h3>
    </v-btn>

    <!-- Note list -->
    <div v-if="isExpandNoteList">
      <div
        v-for="note in noteList"
        :key="note.id"
        class="elevation-2 my-1 rounded note-item"
      >
        <!-- Note header -->
        <v-row
          justify="space-between"
          height="20"
          class="ma-0 pa-0 yellow darken-3"
        >
          <!-- Pin note -->
          <v-btn icon @click="pinNote(note.id)">
            <v-icon v-if="!note.isPin" color="yellow lighten-5">
              mdi-star-outline
            </v-icon>
            <v-icon v-else color="yellow lighten-1"> mdi-star </v-icon>
          </v-btn>

          <v-row justify="end" height="20" class="ma-0 pa-0 yellow darken-3">
            <!-- Edit note -->
            <v-btn icon @click="editNote(note.id)">
              <v-icon color="yellow lighten-5">mdi-pencil</v-icon>
            </v-btn>

            <!-- Delete note -->
            <v-btn icon @click="deleteNote(note.id)">
              <v-icon color="yellow lighten-5">mdi-close</v-icon>
            </v-btn>
          </v-row>
        </v-row>

        <!-- Note content -->
        <v-textarea
          v-model="note.content"
          solo
          readonly
          rows="1"
          row-height="15"
          auto-grow
          hide-details
          background-color="transparent"
        />
      </div>
    </div>
  </v-list>
</template>

<script>
export default {
  name: 'TodoGroup',
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    },
  },
  props: {
    groupHeader: {
      type: String,
      default: '',
    },
    noteList: {
      type: Array,
      default() {
        return []
      },
    },
    pinNote: {
      type: Function,
      default: undefined,
    },
    deleteNote: {
      type: Function,
      default: undefined,
    },
    editNote: {
      type: Function,
      default: undefined,
    },
    completeEdit: {
      type: Function,
      default: undefined,
    },
    cancelEdite: {
      type: Function,
      default: undefined,
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

<style scoped>
.done {
  text-decoration: line-through;
}
.note-item {
  overflow: hidden;
}
.note-item:hover {
  background-color: #fffbf5;
  cursor: pointer;
}
</style>
