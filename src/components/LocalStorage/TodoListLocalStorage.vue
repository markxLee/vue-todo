<template>
    <v-container>
        <todo-item-local-storage
            v-for="(todo, index)  in todos" v-bind:key="todo.localId + '' + index"
            v-bind:todo="todo"
            v-bind:index="index"
            v-on:handleCheck="handleCheck"
            v-on:handleDelete="handleDelete"
            v-on:handleDone="handleDone"
            v-on:handlePin="handlePin"
        />
    </v-container>
</template>

<script>
import TodoItemLocalStorage from './TodoItemLocalStorage.vue'

export default ({
    name: 'TodoList',
    props: {
        todos: {
            type: Array,
            default: null,
        }
    },
    data() {
        return {
        }
    },
    components: {
        TodoItemLocalStorage,
    },
    methods: {
        handleCheck(id){
            this.$emit('handleCheck', id);
        },
        handleDelete(id){
            this.$emit('handleDelete', id);
        },
        handleDone(id){
            this.$emit('handleDone', id);
        },
        handlePin(id){
            this.$emit('handlePin', id);
        }
    },
    computed: {
    }
})
</script>

<style scope>
</style>
