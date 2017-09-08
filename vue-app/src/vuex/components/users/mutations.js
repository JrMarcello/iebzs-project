/* eslint no-param-reassign:0, no-unused-vars:0, no-underscore-dangle:0 */
import * as types from './mutation-types';

const mutations = {
  [types.GET_ALL_USERS](state, { users }) {
    state.users = users;
  },
  [types.GET_ONE_USER](state, { user }) {
    state.user = user;
  },
  [types.RETRIEVE_ONE_USER](state, userId) {
    state.user = state.users.find(item => item._id === userId);
  },
};

export default mutations;
