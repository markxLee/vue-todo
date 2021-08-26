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
      <!-- New note field -->
      <note-input></note-input>

      <!-- Group note list -->
      <note-group
        v-for="(noteGroup, index) in noteGroups"
        :key="index"
        :group-header="noteGroup.groupHeader"
        :note-list="noteGroup.noteList"
      ></note-group>
    </v-card>
  </div>
</template>

<script>
import NoteInput from '~/components/note/NoteInput.vue'
import NoteGroup from '~/components/note/NoteGroup.vue'

export default {
  components: {
    NoteInput,
    NoteGroup,
  },
  head: {
    title: 'Note',
  },
  computed: {
    notes() {
      return this.$store.state.note.notes
    },
    noteGroups() {
      const importantNotes = this.notes.filter((note) => note.isPin)
      const currentNotes = this.notes.filter((note) => !note.isPin)
      const noteGroups = [
        {
          groupHeader: 'Important notes',
          noteList: importantNotes,
        },
        {
          groupHeader: 'Current notes',
          noteList: currentNotes,
        },
      ]

      return noteGroups
    },
  },
  beforeMount() {
    this.loadDataFromLocalStorage()
    window.addEventListener('beforeunload', this.saveDataToLocalStorage)
  },
  beforeDestroy() {
    this.saveDataToLocalStorage()
  },
  methods: {
    loadDataFromLocalStorage() {
      this.$store.commit('note/loadDataFromLocalStorage')
    },
    saveDataToLocalStorage() {
      this.$store.commit('note/saveDataToLocalStorage')
    },
  },
}
</script>
