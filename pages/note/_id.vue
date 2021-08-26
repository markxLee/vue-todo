<template>
  <div class="home">
    <!-- App name -->
    <div
      class="
        text-center
        display-3
        font-weight-medium
        my-10
        yellow--text
        text--darken-3
      "
    >
      Vue Note
    </div>

    <!-- App body -->
    <v-card height="auto" width="600" class="pa-4" :elevation="6">
      <note-item :note="currentNote"></note-item>
    </v-card>
  </div>
</template>

<script>
import NoteItem from '~/components/note/NoteItem.vue'

export default {
  components: {
    NoteItem,
  },
  computed: {
    noteId() {
      return this.$route.params.id
    },
    notes() {
      return this.$store.state.note.notes
    },
    currentNote() {
      const index = this.notes.findIndex(
        (noteItem) => noteItem.id === Number(this.noteId)
      )
      return { ...this.notes[index] }
    },
  },
  created() {
    this.$store.commit('note/loadDataFromLocalStorage')
  },
}
</script>
