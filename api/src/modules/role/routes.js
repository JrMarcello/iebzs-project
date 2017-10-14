import express from 'express';
import controller from './controller';
import { isAuthorized } from '../auth/auth-helper';

const router = express.Router();
const API_ROLE_BASE_PAH = '/role';

export default () => {
  router.post(API_ROLE_BASE_PAH, isAuthorized(), controller.create);
  router.get(API_ROLE_BASE_PAH, isAuthorized(), controller.getAll);
  router.get(API_ROLE_BASE_PAH + '/:id', isAuthorized(), controller.get);
  router.put(API_ROLE_BASE_PAH + '/:id', isAuthorized(), controller.update);
  router.delete(API_ROLE_BASE_PAH + '/:id', isAuthorized(), controller.delete);

  return router;
};
