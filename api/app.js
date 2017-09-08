import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import configs from './config/configs';
import mongodb from './db/mongo';
import routers from './routes';
import { logInfo } from './src/common/utils';

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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
  });
}

function configureParsers() {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
}

function configureLogers() {
  app.use(morgan('dev'));
}

function setRoutes() {
  app.use(configs.api.API_BASE_PATH, routers());
}

function connectBD() {
  mongodb(configs.db);
}

function run() {
  app.listen(configs.server.PORT, () => {
    logInfo('Server run in: ' + configs.server.PORT);
  });
}
