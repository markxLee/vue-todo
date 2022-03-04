<template>
    <div class="input-Item">
            <v-text-field
                outlined
                clearable
                ref="name"
                hide-details="auto"
                label="Task title"
                placeholder="Enter task title"
                v-bind:rules="rules"
                append-icon="mdi-plus"
                v-on:click:append="handleAdd"
                v-on:keyup.enter="handleAdd"
                v-model="inputText"
            >
            </v-text-field>
    </div>
</template>

<script>
export default {
    name: 'InputItem',
    props: {
        todoListLenght: Number
    },
    data() {
        return {
            inputText: '',
            rules: []
        }
    },
    methods: {
        setRules() {
            this.rules = [...this.rules, value => !!value || 'This field is required'];
        },
        handleAdd() {
            this.setRules();
            if(this.$refs.name.validate(true) && this.inputText){
                const data = {
                    id: +this.todoListLenght + 1,
                    content: this.inputText,
                    isChecked: false,
                    pinNumber: 0,
                    todoStatus: 1,
                    index: +this.todoListLenght + 1,
                }
                this.$emit('handleAdd', data);
                this.inputText = '';
                this.rules = [];
            }
        }
    }
}
</script>

<style scope></style>