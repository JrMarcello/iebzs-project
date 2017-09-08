/* eslint no-param-reassign:0, no-unused-vars:0, no-underscore-dangle:0 */
import * as types from './mutation-types';

const mutations = {
  [types.GET_ALL_MEMBERS](state, { members }) {
    state.members = members;
  },
  [types.GET_ONE_MEMBER](state, { member }) {
    state.member = member;
  },
  [types.RETRIEVE_ONE_MEMBER](state, memberId) {
    state.member = state.members.find(item => item._id === memberId);
  },
};

export default mutations;
