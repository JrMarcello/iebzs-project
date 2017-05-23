import express  from 'express';
import path     from 'path';
//import passport   from 'passport';

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

    router.use(authRoutes());
    router.use(memberRoutes());
    router.use(userRoutes());

    return router;
};
