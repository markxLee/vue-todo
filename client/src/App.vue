<template>
  <v-app class="d-flex justify-content">
    <v-btn class="toggle" color="Dark display-1" v-on:click="switchPage">Switch Page</v-btn>
    <app-fire-store router-link :key="$route.fullPath" v-bind:to="switchPage" v-if="direct === '/firestore'"></app-fire-store>
    <app-local-storage router-link :key="$route.fullPath" v-bind:to="switchPage" v-if="direct === '/localstorage'">></app-local-storage>
    <app-create router-link :key="$route.fullPath" v-bind:to="switchPage" v-if="direct === '/create'">></app-create>
  </v-app>
</template>

<script>
import AppFireStore from './page/AppFireStore.vue'
import AppLocalStorage from './page/AppLocalStorage.vue'
import AppCreate from './page/AppCreate.vue'

export default {
  name: 'App',
  components: {
    AppFireStore,
    AppLocalStorage,
    AppCreate,
  },
  data() {
    return {
      direct: "",
    }
  },
  created() {
    if(this.$route.path === "/") {
      this.direct = "/firestore";
      this.$router.push(this.direct)
    } else {
      this.direct = this.$route.path;
      this.$router.replace(this.direct)
    }
  },
  methods: {
    switchPage() {
      if(this.$route.path === "/firestore") {
        this.direct = "/localstorage"
      } else {
        this.direct = "/firestore"
      }
      this.$router.push(this.direct)
    }
  }
}
</script>

<style>
</style>
