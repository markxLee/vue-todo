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
      hint="Tên của task"
      required
    ></v-text-field>
    <v-textarea
        v-model="content"
        name="input-7-1"
        label="Task content"
        hint="Nội dung của task"
        :rules="contentRules"
        rows="2"
    ></v-textarea>

    <v-btn
      :disabled="!valid"
      color="#a1d76f"
      class="mr-4"
      @click="createTask"
      small
    >
      Tạo task
    </v-btn>

    <v-btn
      color="#d15555"
      class="mr-4"
      @click="reset"
      small
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
          this.$emit("createTask", this.name, this.content)
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      }
    },
  }
</script>