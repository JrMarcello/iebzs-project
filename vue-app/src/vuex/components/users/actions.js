/* eslint-disable */
import * as types from './mutation-types';
import UserService from '@/services/users';

const actions = {
  getAll({ commit, state }) {
    UserService.getAll().then((response) => {
      commit(types.GET_ALL_USERS, {
        users: response.body,
      });
    });
  },
  getOne({ commit, state }, user) {
    commit(types.GET_ONE_USER, user);
  },
  getById({ commit, state }, userId) {
    commit(types.RETRIEVE_ONE_USER, userId);
  },
  updateOne({ commit, state }, user) {
    return new Promise((resolve, reject) => {
      UserService.updateOne(user)
        .then((response) => {
          resolve(response.body);
      })
        .catch(err => reject(err.body));
    });
  },
  register({ commit, state }, user) {
    return new Promise((resolve, reject) => {
      UserService.register(user)
        .then((response) => {
          resolve(response.body);
      })
        .catch((err) => {
          reject(err);
        });
    });
  },
  delete({ commit, state }, userId) {
    return new Promise((resolve, reject) => {
      UserService.delete(userId)
        .then((response) => {
          resolve(response.body);
        })
        .catch(err => reject(err.body));
    });
  },
};

export default actions;
