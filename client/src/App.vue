<template>
  <v-app class="d-flex justify-content">
    <router-link style="text-decoration: none; color: inherit; cursor: default;" to="/login" v-if="direct === '/login'">
      <router-view :key="$route.fullPath"><login></login></router-view>
    </router-link>
    <v-btn class="toggle" color="Dark display-1" v-on:click="switchPage" v-if="direct !== '/login'">Switch Page</v-btn>
    <router-link style="text-decoration: none; color: inherit; cursor: default;" to="/mongodb" v-if="direct === '/mongodb'">
      <router-view :key="$route.fullPath"><app-create></app-create></router-view>
    </router-link>
    <router-link style="text-decoration: none; color: inherit; cursor: default;" to="/firestore" v-if="direct === '/firestore'">
      <router-view :key="$route.fullPath"><app-fire-store></app-fire-store></router-view>
    </router-link>
    <router-link style="text-decoration: none; color: inherit; cursor: default;" to="/localstorage" v-if="direct === '/localstorage'">
      <router-view :key="$route.fullPath"><app-local-storage></app-local-storage></router-view>
    </router-link>
  </v-app>
</template>

<script>
import AppFireStore from './page/AppFireStore.vue'
import AppLocalStorage from './page/AppLocalStorage.vue'
import AppCreate from './page/AppCreate.vue'
import Login from './page/Login.vue'

export default {
  name: 'App',
  components: {
    AppFireStore,
    AppLocalStorage,
    AppCreate,
    Login,
  },
  data() {
    return {
      direct: "",
    }
  },
  created() {
    if(this.$route.path === "/") {
      this.direct = "/firestore";
      this.$router.push({ path: this.direct});
    } else {
      this.direct = this.$route.path;
      this.$router.push({ path: this.direct});
    }
  },
  methods: {
    switchPage() {
      if(this.$route.path === "/firestore") {
        this.direct = "/localstorage"
      } else {
        this.direct = "/firestore"
      }
      this.$router.push({ path: this.direct});
    }
  }
}
</script>

<style>
</style>
