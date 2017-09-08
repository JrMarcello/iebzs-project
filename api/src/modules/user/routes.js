import express from 'express';
import controller from './controller';
import { isAuthorized } from '../auth/auth-helper';

const router = express.Router();
const API_USER_BASE_PATH = '/user';

export default () => {
  router.post(API_USER_BASE_PATH, isAuthorized(), controller.create);
  router.get(API_USER_BASE_PATH, isAuthorized(), controller.getAll);
  router.get(API_USER_BASE_PATH + '/:id', isAuthorized(), controller.get);
  router.put(API_USER_BASE_PATH + '/:id', isAuthorized(), controller.update);
  router.delete(API_USER_BASE_PATH + '/:id', isAuthorized(), controller.delete);

  return router;
};
