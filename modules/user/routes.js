'use strict';

import express from 'express';

import controller     from './controller';

const API_USER_BASE_PAH = '/user';

export default (auth) => {
    let router = express.Router();

    router.post(API_USER_BASE_PAH, auth.authenticate(), controller.create)
    router.get(API_USER_BASE_PAH, auth.authenticate(), controller.getAll);
    
    router.get(API_USER_BASE_PAH + '/:id', auth.authenticate(), controller.get)
    router.put(API_USER_BASE_PAH + '/:id', auth.authenticate(), controller.update)
    router.delete(API_USER_BASE_PAH + '/:id', auth.authenticate(), controller.delete);

    return router;
};
