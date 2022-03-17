<template>
  <v-app>
    <v-container fluid>
    <v-row class="d-flex align-center">
      <v-col cols="5">
        <v-combobox
          hide-selected
          :items="itemsFrom"
          label="FROM"
          outlined
          solo
          v-on:change="selectFrom"
          :value="this.sync.from"
        ></v-combobox>
      </v-col>
      <v-col cols="2" class="d-flex justify-center">
        <v-btn class="mx-auto mb-8" v-on:click="SyncData()">Sync</v-btn>
      </v-col>
      <v-col cols="5">
        <v-combobox
          :items="itemsTo"
          hide-selected
          label="TO"
          outlined
          solo
          v-on:change="selectTo"
          :value="this.sync.to"
        ></v-combobox>
      </v-col>
    </v-row>
  </v-container>
  </v-app>
</template>

<script>
const TODO_LOCAL_STORAGE = 'todo-local-storage-data';
import db from '../firebase';
import Todo from '../services/Todo'

export default {
  name: "SyncData",
  data() {
    return {
      items: ["Fire store","Local storage","Mongo Db"],
      itemsFrom: ["Fire store","Local storage","Mongo Db"],
      itemsTo: ["Fire store","Local storage","Mongo Db"],
      sync: {
        from: "",
        to: ""
      },
      dataFrom: [],
      dataTo: [],
      tokens: [],
    };
  },
  watch: {
    sync(){
      if(this.sync.from) {
        this.itemsTo = this.items.filter(item => item !== this.sync.from);
        if(this.sync.from === this.sync.to) {
          this.sync.to = "";
        }
      }
    }
  },
  methods: {
    selectFrom(value) {
      return this.sync = {
        ...this.sync,
        from : value
      }
    },
    selectTo(value) {
      return this.sync = {
        ...this.sync,
        to : value
      }
    },
    comparer(otherArray){
      return function(current){
        return otherArray.filter(function(other){
          return other.content == current.content
        }).length == 0;
      }
    },
    async SyncData(){
      await this.getDataFrom();
      await this.getDataTo();

      let insertData = this.dataFrom.filter(this.comparer(this.dataTo));

      if(!insertData) {
        console.log("NO DATA DIFFERENT");
      } else {
        const todos = [...this.dataTo];
        todos.forEach((todo, index) => {
          if(todo.pinNumber !== 0) {
            todos[index].pinNumber++;
          }
        });
        this.dataTo = todos;
        let dataToMaxIndex = this.dataTo.length + 1;

        switch (this.sync.to) {
          case "Fire store": {
            insertData = insertData.map((data, index) => {
              delete data["_id"];
              delete data["__v"];
              return {
                ...data,
                index: dataToMaxIndex + index
              }
            });

            insertData.forEach((data, index) => {
              db.collection("todoList").add(data)
              .then((res) => {
                insertData[index] = {...insertData[index], _id: res.id };
              })
            })
            this.dataTo = [...this.dataTo, ...insertData];
            break;
          }
          case "Local storage": {
          insertData = insertData.map((data, index) => {
            return {
              ...data,
              index: dataToMaxIndex + index
            }
          });

          this.dataTo = [...this.dataTo, ...insertData];
          localStorage.setItem(TODO_LOCAL_STORAGE, JSON.stringify(this.dataTo));
            break;
          }
          case "Mongo Db": {
            insertData = insertData.map((data, index) => {
              delete data["_id"];
              return {
                ...data,
                index: dataToMaxIndex + index
              }
            });

            insertData.forEach(async (data, index) => {
              const _id = await Todo.create(data);
              insertData[index] = {...data, _id};
            })
            this.dataTo = [...this.dataTo, ...insertData];
            break;
          }
          default:
            break;
        }
      }
    },
    async getDataFrom(){
      switch (this.sync.from) {
        case "Fire store":
        await db.collection("todoList").orderBy("index", "asc").get()
        .then(docs => {
          const todoList = [];
          docs.forEach(doc => {
            if(doc.exists){
              todoList.push({
                _id: doc.id,
                ...doc.data()
              })
            }
          })
          this.dataFrom = [...todoList];
        }
        );
          break;
        case "Local storage":
          this.dataFrom = JSON.parse(localStorage.getItem(TODO_LOCAL_STORAGE) || '[]');
          break;
        case "Mongo Db":
        this.tokens = JSON.parse(localStorage.getItem("token") || '[]');
        this.dataFrom = (await Todo.index(this.tokens)).data || '[]';
          break;
        default:
          break;
      }
    },
    async getDataTo(){
      switch (this.sync.to) {
        case "Fire store":
        await db.collection("todoList").orderBy("index", "asc").get()
        .then(docs => {
          const todoList = [];
          docs.forEach(doc => {
            if(doc.exists){
              todoList.push({
                _id: doc.id,
                ...doc.data()
              })
            }
          })
          this.dataTo = [...todoList];
        });
          break;
        case "Local storage":
          this.dataTo = JSON.parse(localStorage.getItem(TODO_LOCAL_STORAGE) || '[]');
          break;
        case "Mongo Db":
        this.tokens = JSON.parse(localStorage.getItem("token") || '[]');
        this.dataTo = (await Todo.index(this.tokens)).data || '[]';
          break;
        default:
          break;
      }
    }
  }
};
</script>
