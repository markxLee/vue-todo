<template>
  <div>
    <v-textarea
      v-model="newNote"
      placeholder="Take a note"
      solo
      auto-grow
      rows="1"
      row-height="15"
      hide-details=""
    ></v-textarea>
    <v-row
      v-show="isAddingNewNote"
      justify="end"
      height="20"
      class="ma-0 pa-0 pt-2"
    >
      <!-- Cancel adding note -->
      <v-btn
        text
        class="text-none font-weight-bold yellow--text text--darken-3"
        @click="cancelAddNewNote()"
      >
        <!-- <v-icon color="yellow lighten-5">mdi-close</v-icon> -->
        Cancel
      </v-btn>
      <!-- Conform adding note -->
      <v-btn
        text
        class="text-none font-weight-bold yellow--text text--darken-3"
        @click="completeAddNewNote()"
      >
        <!-- <v-icon color="yellow lighten-5">mdi-check</v-icon> -->
        Add
      </v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'NoteInput',
  data() {
    return {
      newNote: '',
    }
  },
  computed: {
    isAddingNewNote() {
      return this.newNote.length > 0
    },
  },
  methods: {
    cancelAddNewNote() {
      this.newNote = ''
    },
    completeAddNewNote() {
      this.$store.commit('note/addNewNote', this.newNote)
      this.newNote = ''
    },
  },
}
</script>
