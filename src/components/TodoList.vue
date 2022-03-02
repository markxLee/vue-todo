<template>
    <div id="TodoListWrapper">
        <TodoItem 
            v-for="(todo,index) in todos" v-bind:key="index"
            v-bind:todo="todo" 
            v-on:handleDelete="handleDelete"
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
        handleDelete(deleteID){
            this.$emit('handleDelete', deleteID);
        }
    },
    computed: {
        pinTask() {
            return 1;
        }
    }
})
</script>

<style scope>
</style>
