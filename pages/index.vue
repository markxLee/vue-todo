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
      Hello world, I'm Vue
    </div>
    <div class="d-flex justify-center mt-16">
      <nuxt-link
        to="/todoLocalStorage"
        class="mx-10"
        style="text-decoration: none"
      >
        <v-card width="400" height="400">
          <v-img src="img/todo.png"></v-img>
        </v-card>
      </nuxt-link>

      <nuxt-link to="/note" class="mx-10" style="text-decoration: none">
        <v-card width="400" height="400">
          <v-img src="img/note.png"></v-img>
        </v-card>
      </nuxt-link>
    </div>
  </div>
</template>
