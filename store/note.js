export const state = () => ({
  notes: [],
  noteIdCount: 0,
})

export const mutations = {
  addNewNote(state, newNote) {
    const newNoteValidated = newNote.trim()
    if (newNoteValidated) {
      state.notes.push({
        id: state.noteIdCount,
        content: newNoteValidated,
        isEditing: false,
        isPin: false,
      })
      state.noteIdCount += 1
    }
  },
  pinNote(state, note) {
    const index = state.notes.findIndex((noteItem) => noteItem.id === note.id)
    state.notes[index].isPin = !state.notes[index].isPin
  },
  deleteNote(state, note) {
    const index = state.notes.findIndex((noteItem) => noteItem.id === note.id)
    state.notes.splice(index, 1)
  },
  updateNote(state, { note, newContent }) {
    const index = state.notes.findIndex((noteItem) => noteItem.id === note.id)
    state.notes[index].content = newContent
  },
  loadDataFromLocalStorage(state) {
    const noteIdCount = localStorage.getItem('noteIdCount')
    const notes = localStorage.getItem('notes')

    if (noteIdCount && notes) {
      try {
        state.notes = JSON.parse(notes)
        if (state.notes.length === 0) {
          state.noteIdCount = 0
          localStorage.setItem('noteIdCount', JSON.stringify(state.noteIdCount))
        }
        if (state.notes.length) {
          state.noteIdCount = JSON.parse(noteIdCount)
        }
      } catch (e) {
        localStorage.removeItem('noteIdCount')
        localStorage.removeItem('notes')
      }
    }
  },
  saveDataToLocalStorage(state) {
    const parsedNoteIdCount = JSON.stringify(state.noteIdCount)
    const parsedNotes = JSON.stringify(state.notes)
    localStorage.setItem('noteIdCount', parsedNoteIdCount)
    localStorage.setItem('notes', parsedNotes)
  },
}
