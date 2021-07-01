<template>
  <v-card elevation="2">
    <v-card-title>Add New</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          ref="todo"
          v-model="todo"
          :rules="[() => !!todo || 'This field is required', (value) => value.length <= 40 || 'Must less than 50 char']"
          label="Todo"
          required
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions class="d-flex">
      <v-spacer />
      <v-btn outlined rounded text @click="addNew"> Add </v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
import { uuid } from "vue-uuid";

export default {
  data() {
    return {
      todo: ""
    };
  },
  methods: {
    addNew() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.$store.dispatch('addTodo', { content: this.todo, isPined: false, status: 'new', id: uuid.v1() })
      this.$refs.form.reset()
    }
  }
};
</script>

<style></style>
