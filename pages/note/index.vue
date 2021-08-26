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
      <group-item
        v-for="(noteGroup, index) in noteGroups"
        v-show="noteGroup.noteList.length > 0"
        :key="index"
      >
        <template #header>
          <h3>{{ noteGroup.groupHeader }}: {{ noteGroup.noteList.length }}</h3>
        </template>
        <template #body>
          <note-item
            v-for="note in noteGroup.noteList"
            :key="note.id"
            :note="note"
            class="mt-1"
          ></note-item>
        </template>
      </group-item>
    </v-card>
  </div>
</template>

<script>
import NoteInput from '~/components/note/NoteInput.vue'
import GroupItem from '~/components/common/GroupItem.vue'
import NoteItem from '~/components/note/NoteItem.vue'

export default {
  components: {
    NoteInput,
    GroupItem,
    NoteItem,
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
