import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import VueAuthenticate from 'vue-authenticate';

import Dashboard from '@/components/Dashboard';
import Login from '@/components/auth/Login';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:8000/api/v1',
  loginUrl: '/auth',
  providers: {
    // Define OAuth providers config
  },
});

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('vue-authenticate.vueauth_token')) {
    next('/login');
  } else if (to.path === '/login' && localStorage.getItem('vue-authenticate.vueauth_token')) {
    next('/');
  } else {
    next();
  }
});

export default router;
