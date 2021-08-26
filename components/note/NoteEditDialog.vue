<template>
  <div>
    <v-btn icon @click="editNote">
      <v-icon color="yellow lighten-5">mdi-pencil</v-icon>
    </v-btn>
    <v-dialog v-model="isShowEditDialog" persistent max-width="400">
      <v-card>
        <v-row
          justify="space-between"
          height="20"
          class="ma-0 pa-0 yellow darken-3"
        >
          <v-btn icon>
            <v-icon color="yellow lighten-5" @click="cancelEdit"
              >mdi-close</v-icon
            >
          </v-btn>
          <v-btn icon>
            <v-icon color="yellow lighten-5" @click="completeEdit"
              >mdi-check</v-icon
            >
          </v-btn>
        </v-row>
        <v-textarea
          v-model="editedContent"
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
export default {
  name: 'NoteEditDialog',
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editedContent: '',
      isShowEditDialog: false,
    }
  },
  methods: {
    toggleOpenEditDialog() {
      this.isShowEditDialog = !this.isShowEditDialog
    },
    editNote() {
      this.editedContent = this.note.content
      this.toggleOpenEditDialog()
    },
    cancelEdit() {
      this.toggleOpenEditDialog()
    },
    completeEdit() {
      this.$store.commit('note/updateNote', {
        note: this.note,
        newContent: this.editedContent,
      })
      this.toggleOpenEditDialog()
    },
  },
}
</script>
