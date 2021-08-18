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
      <v-textarea
        v-model="newNote"
        placeholder="Take a note"
        solo
        auto-grow
        rows="1"
        row-height="15"
        hide-details=""
      />
      <v-row
        v-if="isAddingNewNote"
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

      <!-- Group note list -->
      <NoteGroup
        v-for="(noteGroup, index) in noteGroups"
        :key="index"
        :group-header="noteGroup.groupHeader"
        :note-list="noteGroup.noteList"
        :pin-note="pinNote"
        :delete-note="deleteNote"
        :edit-note="editNote"
        :complete-edit="completeEdit"
        :cancel-edit="cancelEdit"
      />
    </v-card>

    <!-- Editing dialog -->
    <v-dialog v-model="isShowEditDialog" persistent max-width="400">
      <v-card>
        <v-row
          justify="space-between"
          height="20"
          class="ma-0 pa-0 yellow darken-3"
        >
          <v-btn icon>
            <v-icon color="yellow lighten-5" @click="cancelEdit()"
              >mdi-close</v-icon
            >
          </v-btn>
          <v-btn icon>
            <v-icon color="yellow lighten-5" @click="completeEdit()"
              >mdi-check</v-icon
            >
          </v-btn>
        </v-row>
        <v-textarea
          v-model="editCache"
          solo
          autofocus
          rows="10"
          row-height="15"
          auto-grow
          hide-details
          dense
          background-color="transparent"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import NoteGroup from '@/components/NoteGroup.vue'

export default {
  name: 'Note',
  components: {
    NoteGroup,
  },
  data() {
    return {
      editCache: '',
      isShowEditDialog: false,
      noteIdEdit: null,
      newNote: '',
      noteIdCount: 5,
      notes: [],
    }
  },
  head: {
    title: 'Note',
  },
  computed: {
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
    isAddingNewNote() {
      return this.newNote.length > 0
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
    completeAddNewNote() {
      const newNoteValidated = this.newNote.trim()
      if (newNoteValidated) {
        this.notes.push({
          id: this.noteIdCount,
          content: newNoteValidated,
          isEditing: false,
          isPin: false,
        })
        this.noteIdCount += 1
      }
      this.newNote = ''
    },
    cancelAddNewNote() {
      this.newNote = ''
    },
    pinNote(id) {
      const noteId = this.notes.findIndex((note) => note.id === id)
      this.notes[noteId].isPin = !this.notes[noteId].isPin
    },
    deleteNote(id) {
      const noteId = this.notes.findIndex((note) => note.id === id)
      this.notes.splice(noteId, 1)
    },
    editNote(id) {
      const noteId = this.notes.findIndex((note) => note.id === id)
      this.editCache = this.notes[noteId].content
      this.noteIdEdit = noteId
      this.isShowEditDialog = true
    },
    completeEdit() {
      const noteId = this.noteIdEdit
      if (this.editCache.trim() !== '') {
        this.notes[noteId].content = this.editCache.trim()
      }
      this.noteIdEdit = null
      this.isShowEditDialog = false
    },
    cancelEdit() {
      this.noteIdEdit = null
      this.isShowEditDialog = false
    },
    loadDataFromLocalStorage() {
      const noteIdCount = localStorage.getItem('noteIdCount')
      const notes = localStorage.getItem('notes')

      if (noteIdCount && notes) {
        try {
          this.notes = JSON.parse(notes)
          if (this.notes.length === 0) {
            this.noteIdCount = 0
            localStorage.setItem(
              'noteIdCount',
              JSON.stringify(this.noteIdCount)
            )
          }
          if (this.notes.length) {
            this.noteIdCount = JSON.parse(noteIdCount)
          }
        } catch (e) {
          localStorage.removeItem('noteIdCount')
          localStorage.removeItem('notes')
        }
      }
    },
    saveDataToLocalStorage() {
      const parsedNoteIdCount = JSON.stringify(this.noteIdCount)
      const parsedNotes = JSON.stringify(this.notes)
      localStorage.setItem('noteIdCount', parsedNoteIdCount)
      localStorage.setItem('notes', parsedNotes)
    },
  },
}
</script>
