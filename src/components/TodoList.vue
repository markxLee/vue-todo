<template>
    <div id="TodoListWrapper">
        <TodoItem 
            v-for="(todo, index)  in todos" v-bind:key="todo.id"
            v-bind:todo="todo"
            v-bind:index="index"
            v-on:handleDelete="handleDelete"
            v-on:handlePin="handlePin"
        />
    </div>
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
        handlePin(todoIndex){
            this.$emit('handlePin', todoIndex);
        }
    },
    computed: {
    }
})
</script>

<style scope>
</style>
