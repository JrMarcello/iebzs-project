'use strict';

import express from 'express';

import controller from './controller';

const API_USER_BASE_PAH = '/user';

export default (auth) => {
    let router = express.Router();

    router.post(API_USER_BASE_PAH, auth.isAuthorized(), controller.create);
    router.get(API_USER_BASE_PAH, auth.isAuthorized(), controller.getAll);
    
    router.get(API_USER_BASE_PAH + '/:id', auth.isAuthorized(), controller.get);
    router.put(API_USER_BASE_PAH + '/:id', auth.isAuthorized(), controller.update);
    router.delete(API_USER_BASE_PAH + '/:id', auth.isAuthorized(), controller.delete);

    return router;
};
