<template>
    <v-container>
        <todo-item 
            v-for="(todo, index)  in todos" v-bind:key="todo.id"
            v-bind:todo="todo"
            v-bind:index="index"
            v-on:handleDelete="handleDelete"
            v-on:handleDone="handleDone"
            v-on:handlePin="handlePin"
        />
    </v-container>
</template>

<script>
import TodoItem from './TodoItem.vue'

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
        TodoItem,
    },
    methods: {
        handleDelete(index){
            this.$emit('handleDelete', index);
        },
        handleDone(index){
            this.$emit('handleDone', index);
        },
        handlePin(index){
            this.$emit('handlePin', index);
        }
    },
    computed: {
    }
})
</script>

<style scope>
</style>
