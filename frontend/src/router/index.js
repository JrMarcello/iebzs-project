import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(Router)
Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:8000/api'
// Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

export default new Router({
  routes: [
    {
      path: '/',
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
