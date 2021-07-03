import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Todo from '../views/Todo.vue'
import Note from '../views/Note.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/todo',
    name: 'Todo',
    component: Todo,
  },
  {
    path: '/note',
    name: 'Note',
    component: Note,
  },
]

const router = new VueRouter({
  routes,
})

export default router
