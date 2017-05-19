'use strict';

import express    from 'express';
import bodyParser from 'body-parser';
import morgan     from 'morgan';

import serverConfig from './config/server-configs';
import dbConfig     from './config/db-configs';
import * as routers from './routes';

const app = express();

(function init () {
    configureApp();
    run();
})();

function configureApp () {
    configureCORS();
    configureParsers();        
    configureLogers();
    setRoutes();
    configureBD();
};

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

function setRoutes() {
    app.use(routers.Router);
    app.use(serverConfig.API_BASE_PATH, routers.memberRoutes);
    app.use(serverConfig.API_BASE_PATH, routers.userRoutes);
}

function configureBD() {
    dbConfig.initDatabase();
};

function run() {    
    app.listen(serverConfig.PORT, function() {
        console.log('Server run in: ' + serverConfig.PORT);
    })
};