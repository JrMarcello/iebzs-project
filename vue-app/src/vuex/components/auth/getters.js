/* eslint arrow-body-style:0, no-unused-vars:0, no-underscore-dangle:0, arrow-parens:0  */
import Vue from 'vue';
import VueResource from 'vue-resource';
import { VueAuthenticate } from 'vue-authenticate';

import * as types from './mutation-types';

Vue.use(VueResource);

const vueAuth = new VueAuthenticate(Vue.http);

const getters = {
  isAuthenticated: (state) => {
    return state.logged_user && vueAuth.isAuthenticated();
  },
  loggedUser: (state) => {
    return state.logged_user;
  },
};

export default getters;
