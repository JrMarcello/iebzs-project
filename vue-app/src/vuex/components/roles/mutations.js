/* eslint no-param-reassign:0, no-unused-vars:0, no-underscore-dangle:0 */
import * as types from './mutation-types';

const mutations = {
  [types.GET_ALL_ROLES](state, { roles }) {
    state.roles = roles;
  },
  [types.GET_ONE_ROLE](state, { role }) {
    state.role = role;
  },
  [types.RETRIEVE_ONE_ROLE](state, roleId) {
    state.role = state.roles.find(item => item._id === roleId);
  },
};

export default mutations;
