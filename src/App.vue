<template>
  <v-app>
    <v-app-bar
      app
      class="app-bar"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Binh.n Logo"
          class="mr-2"
          contain
          src="./assets/logo-b.png"
          transition="scale-transition"
          width="30"
        />
        <v-img
          alt="Todo List"
          class="mb-0"
          contain
          min-width="100"
          src="./assets/todo-list.png"
          width="200"
        />
      </div>
      <v-spacer/>
      <v-btn
        href="/"
        dark
        icon
        color="teal"
      >
        <v-icon size="24px">mdi-home</v-icon>
      </v-btn>
      <v-btn
        href="/about"
        dark
        icon
        color="teal"
      >
        <v-icon size="24px">mdi-information</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import './assets/style/app.scss'

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  })
})
</script>
