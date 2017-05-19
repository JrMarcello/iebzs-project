import express from 'express';
import path    from 'path';

import memberRoutes from './modules/member/routes';
import userRoutes   from './modules/user/routes';

const app    = express();
const Router = express.Router();

Router.get('/', (req, res) => {        
    res.sendFile(path.join(__dirname + '/index.html'))
});

Router.get('/api', (req, res) => {        
    res.sendFile(path.join(__dirname + '/index.html'))
});

export { Router, memberRoutes, userRoutes };