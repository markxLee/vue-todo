<template>
  <div>
    <div
      class="
        display-3
        text-center
        font-weight-medium
        yellow--text
        text--darken-3
        my-10
      "
    >
      Hello world
    </div>
    <div class="d-flex justify-center mt-16">
      <router-link to="/todo" class="mx-10" style="text-decoration: none">
        <v-card width="400" height="400">
          <v-img src="../assets/todo.png"></v-img>
        </v-card>
      </router-link>

      <router-link to="/note" class="mx-10" style="text-decoration: none">
        <v-card width="400" height="400">
          <v-img src="../assets/note.png"></v-img>
        </v-card>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>
