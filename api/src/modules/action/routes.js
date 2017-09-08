import express from 'express';
import controller from './controller';
import { isAuthorized } from '../auth/auth-helper';

const router = express.Router();
const API_MEMBER_BASE_PAH = '/action';

export default () => {
  router.get(API_MEMBER_BASE_PAH, isAuthorized(), controller.getAll);

  return router;
};

