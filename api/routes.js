import express from 'express';
import path from 'path';

import * as auth from './src/modules/auth/auth';
import authRoutes from './src/modules/auth/routes';
import userRoutes from './src/modules/user/routes';
import memberRoutes from './src/modules/member/routes';

export default () => {
    let router = express.Router();

    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/index.html'))
    });

    router.get('/api', (req, res) => {
        res.sendFile(path.join(__dirname + '/index.html'))
    });

    router.use(authRoutes());
    router.use(userRoutes(auth));
    router.use(memberRoutes(auth));

    return router;
};
