'use strict';

import express from 'express';

import controller from './controller';

const API_AUTH_BASE_PAH = '/login';

export default () => {
    let router = express.Router();

    router.post(API_AUTH_BASE_PAH, controller.login);

    return router;
};
