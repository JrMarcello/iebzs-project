/* eslint-disable */
import * as types from './mutation-types';
import MembersService from '@/services/members';

const actions = {
  getAll({ commit, state }) {
    return new Promise((resolve, reject) => {
      MembersService.getAll()
        .then((response) => {
          commit(types.GET_ALL_MEMBERS, {
            members: response.body.data,
          });
          resolve();
        })
        .catch((err) => {
          reject(err.body);
        });
    });
  },
  getOne({ commit, state }, member) {
    commit(types.GET_ONE_MEMBER, member);
  },
  getById({ commit, state }, memberId) {
    commit(types.RETRIEVE_ONE_MEMBER, memberId);
  },
  updateOne({ commit, state }, member) {
    return new Promise((resolve, reject) => {
      MembersService.updateOne(member)
        .then((response) => {
          resolve(response.body);
        })
        .catch(err => reject(err.body));
    });
  },
  register({ commit, state }, member) {
    return new Promise((resolve, reject) => {
      MembersService.register(member)
        .then((response) => {
          resolve(response.body);
        })
        .catch((err) => {
          reject(err.body);
        });
    });
  },
  delete({ commit, state }, memberId) {
    return new Promise((resolve, reject) => {
      MembersService.delete(memberId)
        .then((response) => {
          resolve(response.body);
        })
        .catch(err => reject(err.body));
    });
  },
};

export default actions;
