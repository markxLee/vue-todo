import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import UUID from 'vue-uuid'
  
Vue.config.productionTip = false

new Vue({
  UUID,
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
