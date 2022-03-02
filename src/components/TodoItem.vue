<template>
    <div class="TodoWrapper">
        <div class="todo">
            <input
                type="checkbox" 
                name="chkCheckTodo"
                v-on:change="changeCheck"
                v-model="isChecked"
                v-bind:disabled="disabled"
            >
            <span name="contentTxt" 
                v-bind:class="disableClass"
            >
                {{todo.content}}
            </span>
            <div class="action" v-if="todo.isChecked">
                <button class="btnDelete" 
                    v-on:click="handleDelete" 
                    v-bind:disabled="disabled"
                >
                    Remove
                </button>
                <button class="btnDone"
                    v-bind:disabled="disabled"
                    v-on:click="handleDone" 
                >
                    Done
                </button>
                <button class="btnPin"
                    v-bind:disabled="disabled"
                    v-on:click="handlePin" 
                >   Pin 
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default ({
        name: 'TodoItem',
        data() {
            return {
                isChecked: this.todo.isChecked,
            }
        },
        props: {
            todo: {
                type: Object,
                default: null,
            }
        },
        components: {
        },
        methods: {
            handleDelete(){
                const deleteID = this.todo.id
                this.$emit('handleDelete', deleteID);
            },
            handleDone(){
                this.$set(this.todo, 'todoStatus', 2);
            },
            handlePin(){
                this.$emit('handlePin', this.todo.id);
            },
            changeCheck(){
                this.$set(this.todo, 'isChecked', !this.todo.isChecked);
            }
        },
        computed: {
            disabled() {
                return this.todo.todoStatus === 2
            },
            disableClass() {
                return {
                    disable: this.todo.todoStatus === 2
                }
            }
        }
    })
</script>

<style scope>
    .todo {
        display: flex;
    }
    .todo .disable {
        text-decoration: line-through;
    }
</style>
