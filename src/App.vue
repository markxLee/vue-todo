<template>
  <div class="v-application">
    <v-app-bar class="d-flex justify-center">
      <router-link class="mx-4 text-decoration-none" to="/">
        <h2>Todo List</h2>
      </router-link
      >
      <router-link class="mx-4 text-decoration-none" to="/about">
        <h2>About</h2>
      </router-link
      >
    </v-app-bar>
    <router-view class="ma-5" />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
