/* eslint no-param-reassign:0 */
import * as types from './mutation-types';

const mutations = {
  [types.SET_LOGGED_USER](state, user) {
    state.logged_user = user;
  },
  [types.LOGOUT_USER](state) {
    state.logged_user = {};
  },
};

export default mutations;
