import db from '../firebase';

const state = {
    decreaseNumber: 0,
    todos: []
}

const getters = {
    todoLength: state => {
        return state.todos.length;
    },
    
}

const mutations = {
    sortPinList(state){
        state.todos.sort(function(a,b){
            return b.pinNumber - a.pinNumber;
        });
    },
    handleAdd(state, payload){
        db.collection("todoList").add(payload)
        .then((res) => {
            state.todos.push({...payload, id: res.id })
        })
        .catch(e => console.log(e))

        // this.todos.push(data);
        // localStorage.setItem(TODO_LOCAL_STORAGE, JSON.stringify(this.todos));
    },
    handleDelete(state, payload){
        let index = state.todos.findIndex(todo => todo.id === payload);

        let todoRef = db.collection("todoList");
        todoRef.doc(payload).delete()
        .then (() => state.todos.splice(index, 1));
        
        //state.todos.splice(index, 1);
        //localStorage.setItem(TODO_LOCAL_STORAGE, JSON.stringify(state.todos));
    },
    handleDone(state, payload){
        let index = state.todos.findIndex(todo => todo.id === payload);

        let todoRef = db.collection("todoList");
        todoRef.doc(payload).update({
          todoStatus: 2
        })
        .then (() => state.todos[index].todoStatus = 2)

        // state.todos[index].todoStatus = 2;
        // localStorage.setItem(TODO_LOCAL_STORAGE, JSON.stringify(state.todos));
    },
    handleCheck(state, payload){
        let index = state.todos.findIndex(todo => todo.id === payload);
  
        let todoRef = db.collection("todoList");
        todoRef.doc(payload).update({
          isChecked: !state.todos[index].isChecked
        })
        .then (() => state.todos[index].isChecked = !state.todos[index].isChecked)

        //state.todos[index].isChecked = !state.todos[index].isChecked;
        //localStorage.setItem(TODO_LOCAL_STORAGE, JSON.stringify(state.todos));
    }
}

const actions = {
    handleAdd: ({commit} , payload) => {
        commit("handleAdd", payload);
    },
    handleDelete: ({commit} , payload) => {
        commit("handleDelete", payload);
    },
    handleDone: ({commit} , payload) => {
        commit("handleDone", payload);
    },
    handleCheck: ({commit} , payload) => {
        commit("handleCheck", payload);
    },
}


export { state, getters, mutations, actions }