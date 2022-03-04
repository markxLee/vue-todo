<template>
    <v-container class="d-flex justify-content align-center pa-0">
        <v-row class="py-1">
            <v-col md="9">
                <div class="d-flex align-center flex-nowrap">
                    <v-checkbox
                        v-on:change="handleCheck"
                        v-model="isChecked"
                        v-bind:disabled="disabled"
                    >
                    </v-checkbox>
                    <div
                        name="contentTxt" 
                        v-bind:class="disableClass"
                    >
                        {{todo.content}}
                    </div>
                </div>
            </v-col>
            <v-col md="3" class="action d-flex align-center justify-end px-0" v-if="todo.isChecked">
                <v-btn class="btnDelete" 
                    v-on:click="handleDelete" 
                    v-bind:disabled="disabled"
                    color="red darken-1"
                >
                    <v-icon class="white--text">
                    mdi-minus
                    </v-icon>
                </v-btn>
                <v-btn class="btnDone"
                    v-bind:disabled="disabled"
                    v-on:click="handleDone" 
                    color="green"
                >
                    <v-icon class="white--text">
                    mdi-check
                    </v-icon>
                </v-btn>
                <v-btn class="btnPin"
                    v-bind:disabled="disabled"
                    v-on:click="handlePin" 
                    color="blue"
                >   
                    <v-icon class="white--text">
                {{todo.pinNumber ? "mdi-pin-off" : "mdi-pin"}} 
                    </v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
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
            },
            index: Number
        },
        components: {
        },
        methods: {
            handleDelete(){
                this.$emit('handleDelete', this.index);
            },
            handleDone(){
                this.$emit('handleDone', this.index);
            },
            handlePin(){
                this.$emit('handlePin', this.index);
            },
            handleCheck(){
                this.$emit('handleCheck', this.index);
            }
        },
        computed: {
            disabled() {
                return this.todo.todoStatus === 2
            },
            disableClass() {
                return {
                    'text-decoration-line-through': this.todo.todoStatus === 2
                }
            }
        }
    })
</script>

<style scope>
</style>
