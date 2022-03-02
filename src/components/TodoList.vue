<template>
    <div id="TodoListWrapper">
        <TodoItem 
            v-for="todo in todos" v-bind:key="todo.id"
            v-bind:todo="todo" 
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
        handleDelete(deleteID){
            this.$emit('handleDelete', deleteID);
        },
        handlePin(id){
            this.$emit('handlePin', id);
        }
    },
    computed: {
        // pinTask() {
        //     const listPinnedTask = [];
        //     this.todos.map((todo,index) => {
        //         if(todo.pinNumber !== 0) {
        //         }
        //         return index;
        //     });
        //     return this.todos;
        // }
    }
})
</script>

<style scope>
</style>
