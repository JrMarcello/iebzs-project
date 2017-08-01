import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

// Vue.use(Router)
Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:8080/api'
// Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

Vue.router = Router

Vue.use(require('@websanova/vue-auth'), {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/vue-resource.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  rolesVar: 'type',
  loginData: {url: 'auth', method: 'POST', redirect: '/dashboard', fetchUser: false}
  // fetchData: {url: 'auth/user', method: 'GET'}
})

export default new Router({
  routes: [
    {
      path: '/',
      component: require('@/components/dashboard')
    },
    {
      path: '/login',
      meta: {auth: false},
      component: require('@/components/login')
    },
    {
      path: '/dashboard',
      meta: {auth: true},
      component: require('@/components/dashboard')
    }
  ]
})

// router.redirect({
//   '*': '/dashboard'
// })
