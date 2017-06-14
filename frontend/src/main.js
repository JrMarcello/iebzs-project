import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
// Vue.http.options.root = 'http://localhost:8000/api'

Vue.use(require('@websanova/vue-auth'), {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/vue-resource.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  rolesVar: 'type',
  loginData: {url: 'auth', method: 'POST', redirect: '/dashboard', fetchUser: false}
  // fetchData: {url: 'auth/user', method: 'GET'}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
