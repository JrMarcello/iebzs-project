/* eslint no-unused-vars:0 */
import Vue from 'vue';
import VueResource from 'vue-resource';
import { VueAuthenticate } from 'vue-authenticate';

import * as types from './mutation-types';

Vue.use(VueResource);

const vueAuth = new VueAuthenticate(Vue.http, {
  baseUrl: 'http://localhost:8000/api/v1',
  loginUrl: '/auth',
});

const actions = {
  login({ commit, state }, credentials) {
    return new Promise((resolve, reject) => {
      vueAuth.login(credentials)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  logout({ commit, state }) {
    vueAuth.logout();
    commit(types.LOGOUT_USER);
  },
  setLoggedUser({ commit, state }) {
    commit(types.SET_LOGGED_USER, vueAuth.getPayload());
  },
};

export default actions;
