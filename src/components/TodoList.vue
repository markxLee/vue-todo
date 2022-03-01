<template>
    <div id="wrapper">
        <div name="addTask">
            <input type="text" id="inputContent">
            <button class="btnAdd">Add</button>
        </div>
        <div class="todo-list" v-for="todo in todos" :key="todo.id">
            <div class="todo">
                <input type="checkbox" name="chkCheckTodo">
                <div name="contentTxt">{{todo.content}}</div>
                <div class="action" v-if="todo.isChecked">
                    <button class="btnDelete">Remove</button>
                    <button class="btnDone">Done</button> 
                    <button class="btnPin">Pin </button> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default ({
    props: ['todos'],
})
</script>

<style scope>
    .todo {
        display: flex;
        height: 30px;
        margin-top: 5px;
    }
</style>
