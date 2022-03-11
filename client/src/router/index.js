import Vue from 'vue'
import VueRouter from 'vue-router'
import AppFireStore from '../page/AppFireStore.vue'
import AppLocalStorage from '../page/AppLocalStorage.vue'
import AppCreate from '../page/AppCreate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/firestore',
    name: 'firestore',
    component: AppFireStore
  },
  {
    path: '/localstorage',
    name: 'localstorage',
    component: AppLocalStorage
  },
  {
    path: '/mongodb',
    name: 'mongodb',
    component: AppCreate
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
