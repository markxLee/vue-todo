import Vue from 'vue'
import VueRouter from 'vue-router'
import AppFireStore from '../page/AppFireStore.vue'
import AppLocalStorage from '../page/AppLocalStorage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'firestore',
    component: AppFireStore
  },
  {
    path: '/localstorage',
    name: 'localstorage',
    component: AppLocalStorage
  }
]

const router = new VueRouter({
  routes
})

export default router
