<template>
  <v-app>
    <v-main>
      <ListTodo/>
    </v-main>
  </v-app>
</template>

<script>
import ListTodo from './components/TaskDashboard';

export default {
  name: 'App',

  components: {
    ListTodo,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
  @import './assets/styles/global.css';
</style>

