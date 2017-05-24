import express  from 'express';
import path     from 'path';

import * as auth    from './modules/auth/auth';
import authRoutes   from './modules/auth/routes';
import userRoutes   from './modules/user/routes';
import memberRoutes from './modules/member/routes';

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
