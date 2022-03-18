<template>
  <v-app class="d-flex justify-content">
    <v-btn
      class="toggle"
      color="Dark display-1"
      v-on:click="switchPage"
      v-if="display"
      >Switch Page</v-btn
    >
    <v-btn
      class="toggle mt-4"
      color="Dark display-1"
      v-on:click="Logout"
      v-if="display"
      >Logout</v-btn
    >
    <router-view></router-view>
  </v-app>
</template>

<script>
import Auth from './services/Auth'

export default {
  name: "App",
  data() {
    return {
      direct: "",
    };
  },
  computed: {
    display(){
      const isDisplay = ["/firestore","/localstorage","/mongodb"].includes(this.$route.path);
      return isDisplay;
    }
  },
  created() {
    if (this.$route.path === "/") {
      this.direct = "/firestore";
      this.$router.push({ path: this.direct });
    } else {
      this.direct = this.$route.path;
      this.$router.push({ path: this.direct });
    }
  },
  methods: {
    switchPage() {
      if (this.$route.path === "/firestore") {
        this.direct = "/localstorage";
      } else {
        this.direct = "/firestore";
      }
      this.$router.push({ path: this.direct });
    },
    async Logout() {
      try {
        let token = JSON.parse(localStorage.getItem("token") || '[]');
        const logout = await Auth.logout(token);
        if(logout.status === 204) {
          localStorage.removeItem("token");
          const path = "/login";
          this.$router.push(path);
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>

<style></style>
