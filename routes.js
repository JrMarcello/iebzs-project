import express  from 'express';
import path     from 'path';

import auth         from './modules/auth/auth';
import authRoutes   from './modules/auth/routes';
import memberRoutes from './modules/member/routes';
import userRoutes   from './modules/user/routes';

export default () => {
    let router = express.Router();

    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/index.html'))
    });

    router.get('/api', (req, res) => {
        res.sendFile(path.join(__dirname + '/index.html'))
    });

    router.use(authRoutes(auth));
    router.use(memberRoutes(auth));
    router.use(userRoutes(auth));

    return router;
};
