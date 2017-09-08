import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { VueAuthenticate } from 'vue-authenticate';

import Dashboard from '@/components/Dashboard';
import Login from '@/components/auth/Login';
import Members from '@/components/members/Members';
import MemberAdd from '@/components/members/MemberAdd';
import MemberEdit from '@/components/members/MemberEdit';
import MemberDetail from '@/components/members/MemberDetail';
import Users from '@/components/users/Users';
import UserAdd from '@/components/users/UserAdd';
import UserEdit from '@/components/users/UserEdit';
import UserDetail from '@/components/users/UserDetail';

Vue.use(VueResource);
Vue.use(VueRouter);

const vueAuth = new VueAuthenticate(Vue.http);

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
      name: 'login',
      component: Login,
    },
    {
      path: '/membros',
      name: 'Membros',
      component: Members,
      meta: { requiresAuth: true },
    },
    {
      path: '/membro/add',
      name: 'Novo Membro',
      component: MemberAdd,
      meta: { requiresAuth: true },
    },
    {
      path: '/membro/edit/:id',
      name: 'Editar Membro',
      component: MemberEdit,
      meta: { requiresAuth: true },
    },
    {
      path: '/membro/view/:id',
      name: 'Membro',
      component: MemberDetail,
      meta: { requiresAuth: true },
    },
    {
      path: '/usuarios',
      name: 'Usuários',
      component: Users,
      meta: { requiresAuth: true },
    },
    {
      path: '/usuario/add',
      name: 'Novo Usuário',
      component: UserAdd,
      meta: { requiresAuth: true },
    },
    {
      path: '/usuario/edit/:id',
      name: 'Editar Usuário',
      component: UserEdit,
      meta: { requiresAuth: true },
    },
    {
      path: '/usuario/view/:id',
      name: 'Usuário',
      component: UserDetail,
      meta: { requiresAuth: true },
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

Vue.http.interceptors.push((request, next) => {
  if (vueAuth.isAuthenticated()) {
    request.headers.set('Authorization', `JWT ${vueAuth.getToken()}`);
    request.headers.set('Accept', 'application/json');
  }

  next();
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !vueAuth.isAuthenticated()) {
    next('/login');
  } else if (to.path === '/login' && vueAuth.isAuthenticated()) {
    next('/');
  } else {
    next();
  }
});

export default router;
