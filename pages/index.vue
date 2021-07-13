<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <v-img
          alt="Binh.n Logo"
          class="mr-2"
          contain
          src="./logo-b.png"
          transition="scale-transition"
          width="30"
        />
        <v-img
          alt="Todo List"
          class="mb-0"
          contain
          min-width="100"
          src="./todo-list.png"
          width="200"
        />
      </v-card>
      <v-card>
        <v-card-title class="headline justify-center">
          Welcome to the Todo List of Binh.n
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
