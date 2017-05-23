'use strict';

import express from 'express';

import controller from './controller';

const API_AUTH_BASE_PAH = '/login';

export default () => {
    let router = express.Router();

    router.route(API_AUTH_BASE_PAH)
          .post(controller.login);

    return router;
};
