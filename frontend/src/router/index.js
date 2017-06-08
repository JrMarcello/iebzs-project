import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: require('@/components/login')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: require('@/components/dashboard')
    }
  ]
})
