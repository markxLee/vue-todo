<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Task name"
      required
    ></v-text-field>
    <v-textarea
        v-model="content"
        name="input-7-1"
        label="Task content"
        hint="Hint text"
        :rules="contentRules"
    ></v-textarea>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="createTask"
    >
      Tạo task
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset
    </v-btn>
  </v-form>
</template>
<script>
  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Task name is required',
      ],
      content: '',
      contentRules: [
        v => !!v || 'Content is required',
      ],
    }),

    methods: {
      createTask () {
        this.$refs.form.validate()
        if(this.valid && this.name && this.content) 
        {
            alert(this.name)
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>