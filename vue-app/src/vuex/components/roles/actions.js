/* eslint-disable */
import RolesService from '@/services/roles';
import * as types from './mutation-types';

const actions = {
  getAll({ commit, state }) {
    RolesService.getAll().then((response) => {
      commit(types.GET_ALL_ROLES, {
        roles: response.body,
      });
    });
  },
  getById({ commit, state }, roleId) {
    commit(types.RETRIEVE_ONE_ROLE, memberId);
  },
};

export default actions;
