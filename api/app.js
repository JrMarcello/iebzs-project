'use strict';

import express    from 'express';
import bodyParser from 'body-parser';
import morgan     from 'morgan';

import configs from './config/configs';
import db      from './db/mongo';
import routers from './routes';

const app = express();

configureCORS();
configureParsers();
configureLogers();
setRoutes();
connectBD();
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

function setRoutes() {
    app.use(configs.api.API_BASE_PATH, routers());
}

function connectBD() {
    db(configs.db);
};

function run() {
    app.listen(configs.server.PORT, function() {
        console.log('Server run in: ' + configs.server.PORT);
    })
};
