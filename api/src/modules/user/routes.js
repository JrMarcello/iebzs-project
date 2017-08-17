import express from 'express';
import controller from './controller';

const API_USER_BASE_PATH = '/user';

export default (auth) => {
  const router = express.Router();

  router.post(API_USER_BASE_PATH, auth.isAuthorized(), controller.create);
  router.get(API_USER_BASE_PATH, auth.isAuthorized(), controller.getAll);

  router.get(API_USER_BASE_PATH + '/:id', auth.isAuthorized(), controller.get);
  router.put(API_USER_BASE_PATH + '/:id', auth.isAuthorized(), controller.update);
  router.delete(API_USER_BASE_PATH + '/:id', auth.isAuthorized(), controller.delete);

  return router;
};
