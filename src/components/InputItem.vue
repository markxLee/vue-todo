<template>
    <div class="addTask">
        <input 
            type="text" 
            id="inputContent" 
            v-model="inputText"
        >
        <button class="btnAdd" v-on:click="handleAdd">Add</button>
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
            inputText: ''
        }
    },
    methods: {
        handleAdd() {
            const data = {
                id: +this.todoListLenght + 1,
                content: this.inputText,
                isChecked: false,
                pinNumber: 0,
                todoStatus: 1,
            }
            console.log(data);
            this.$emit('handleAdd', data);
        }
    }
}
</script>

<style scope></style>