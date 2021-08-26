<template>
  <div class="elevation-2 rounded note-item">
    <!-- Note header -->
    <v-row
      justify="space-between"
      height="20"
      class="ma-0 pa-0 yellow darken-3"
    >
      <!-- Pin note -->
      <v-btn icon @click="pinNote">
        <v-icon v-if="!note.isPin" color="yellow lighten-5">
          mdi-star-outline
        </v-icon>
        <v-icon v-else color="yellow lighten-1"> mdi-star </v-icon>
      </v-btn>

      <v-row justify="end" height="20" class="ma-0 pa-0 yellow darken-3">
        <!-- Edit note -->
        <note-edit-dialog :note="note"></note-edit-dialog>

        <!-- Delete note -->
        <v-btn icon @click="deleteNote">
          <v-icon color="yellow lighten-5">mdi-close</v-icon>
        </v-btn>
      </v-row>
    </v-row>

    <!-- Note content -->
    <v-textarea
      :value="note.content"
      solo
      readonly
      rows="1"
      row-height="15"
      auto-grow
      hide-details
      background-color="transparent"
    ></v-textarea>
  </div>
</template>

<script>
import NoteEditDialog from '~/components/note/NoteEditDialog.vue'

export default {
  name: 'NoteItem',
  components: {
    NoteEditDialog,
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    },
  },
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    isExpandNoteList: true,
  }),
  methods: {
    pinNote() {
      this.$store.commit('note/pinNote', this.note)
    },
    deleteNote() {
      this.$store.commit('note/deleteNote', this.note)
    },
  },
}
</script>

<style scoped>
.note-item {
  overflow: hidden;
}
.note-item:hover {
  background-color: #fffbf5;
  cursor: pointer;
}
</style>
