'use strict';

import express from 'express';

import controller     from './controller';
//import authController from '../auth/controller';

const API_USER_BASE_PAH = '/user';

const router = express.Router();

router.route(API_USER_BASE_PAH)
    .post(controller.create)
    .get(controller.getAll);

router.route(API_USER_BASE_PAH + '/:id')
    .get(controller.get)
    .put(controller.update)
    .delete(controller.delete);

export default router;