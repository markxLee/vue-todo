<template>
  <v-app class="d-flex justify-content">
    <v-container>
      <v-card>
        <v-card-title class="display-1">Login</v-card-title>
        <v-card-text>
          <v-text-field
              outlined
              ref="name"
              hide-details="auto"
              placeholder="Enter user name"
              v-model="username"
              name="inputText"
              v-on:keyup.enter="Login"
              v-bind:rules="rules"
          >
          </v-text-field>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import Auth from '../services/Auth'

export default {
  name: 'LoginApp',
  data() {
    return {
        username: "",
        path: "",
        rules: [],
    }
  },
  methods: {
    async Login() {
      try {
        const {data: token} = await Auth.login({username: this.username});
        localStorage.setItem("token", JSON.stringify(token));
        const path = "/mongodb";
        this.$router.push(path)
      } catch (error) {
        console.log(error);
        this.rules = [...this.rules, 'User not exist'];
      }
    }
  }
}
</script>
