'use strict';

import express from 'express';

import * as controller from './controller';

const API_USER_BASE_PAH = '/user';

const router = express.Router();

router.post('/user', controller.create);
router.get('/user', controller.getAll);
router.put('/user/:id', controller.update);
router.delete('/user/:id', controller.delete);
router.get('/user/:id', controller.get);

export default router;