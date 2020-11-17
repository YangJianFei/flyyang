import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import tool from './utils/tool'
import axios from './utils/request'

Vue.config.productionTip = false
Vue.prototype.$tool = tool
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
