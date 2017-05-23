'use strict';

import express    from 'express';
import bodyParser from 'body-parser';
import morgan     from 'morgan';
import passport   from 'passport';

import config       from './config/configs';
import dbConfig     from './config/db-configs';
import * as routers from './routes';

const app = express();

configureCORS();
configureParsers();
configureLogers();
//configureAuth();
setRoutes();
configureBD();
run();

function configureCORS() {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
        next();
    });
    
};

function configureParsers() {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
};

function configureLogers() {
    app.use(morgan('dev'));
};

// function configureAuth() {
//     app.use(auth.initialize());
// }

function setRoutes() {
    app.use(routers.Router);
    app.use(config.api.API_BASE_PATH, routers.authRoutes);
    app.use(config.api.API_BASE_PATH, routers.memberRoutes);
    app.use(config.api.API_BASE_PATH, routers.userRoutes);
}

function configureBD() {
    dbConfig.initDatabase();
};

function run() {    
    app.listen(config.server.PORT, function() {
        console.log('Server run in: ' + config.server.PORT);
    })
};
