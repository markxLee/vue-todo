<template>
  <v-app id="app">
    <v-app-bar app>
      <router-link to="/">
        <v-img src="./assets/logo.png" max-width="40" max-height="40"></v-img>
      </router-link>

      <v-row justify="end" class="ma-0 ml-1">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/Todo" class="nav-link">Todo</router-link>
        <router-link to="/Note" class="nav-link">Note</router-link>
      </v-row>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app>
      <v-row justify="center" no-gutters>
        <div height="40">@ Nguyen Hoang Tuan</div>
      </v-row>
    </v-footer>
  </v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.nav-link {
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: 600;
  color: rgb(95, 95, 95) !important;
  padding: 0 10px;
  margin: 0 10px;
}
</style>
