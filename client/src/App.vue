<template>
  <v-app class="d-flex justify-content">
    <v-btn
      class="toggle"
      color="Dark display-1"
      v-on:click="switchPage"
      v-if="display"
      >Switch Page</v-btn
    >
    <router-view></router-view>
  </v-app>
</template>

<script>
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
  },
};
</script>

<style></style>
