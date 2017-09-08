import Vue from 'vue';
import Vuex from 'vuex';

import auth from './components/auth';
import members from './components/members';
import users from './components/users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    members,
    users,
  },
});
