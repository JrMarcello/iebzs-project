import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
// Vue.http.options.root = 'http://localhost:8000/api'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
