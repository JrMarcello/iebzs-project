import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(Router)
Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:8000/api'

Vue.use(require('@websanova/vue-auth'), {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/vue-resource.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  rolesVar: 'type',
  loginData: {url: 'auth/login', method: 'POST', redirect: '/dashboard', fetchUser: false}
  // fetchData: {url: '/user', method: 'GET', enabled: true}
})

export default Vue.router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
      // component: require('@/components/dashboard')
    },
    {
      path: '/login',
      meta: {auth: true},
      component: require('@/components/login')
    },
    {
      path: '/dashboard',
      meta: {auth: true},
      component: require('@/components/dashboard')
    }
  ]
})
