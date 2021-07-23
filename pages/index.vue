<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <v-img
          alt="Home"
          class="mb-0"
          contain
          min-width="100"
          src="./home.png"
          width="200"
        />
        <v-icon size="90px">mdi-home-heart</v-icon>
      </v-card>
      <v-card>
        <v-card-title class="headline justify-center">
          Todo List App
        </v-card-title>
        <v-card-actions class="justify-center">
          <v-btn
            color="primary"
            nuxt
            to="/todoMain"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
