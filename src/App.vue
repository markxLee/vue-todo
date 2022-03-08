<template>
  <v-app class="d-flex justify-content">
    <v-btn class="toggle" color="Dark display-1" v-on:click="switchPage">Switch Page</v-btn>
    <app-fire-store router-link v-bind:to="switchPage" v-if="direct === '/firestore'"></app-fire-store>
    <app-local-storage router-link v-bind:to="switchPage" v-if="direct === '/localstorage'">></app-local-storage>
  </v-app>
</template>

<script>
import AppFireStore from './page/AppFireStore.vue'
import AppLocalStorage from './page/AppLocalStorage.vue'

export default {
  name: 'App',
  components: {
    AppFireStore,
    AppLocalStorage,
  },
  data() {
    return {
      direct: "/firestore",
    }
  },
  methods: {
    switchPage() {
      if(this.direct === "/firestore") {
        this.direct = "/localstorage"
      } else {
        this.direct = "/firestore"
      }
    }
  }
}
</script>

<style>
</style>
