import express from 'express';
import path from 'path';

// import { isAuthorized as auth} from './src/modules/auth/auth-helper';
import authRoutes from './src/modules/auth/routes';
import actionRoutes from './src/modules/action/routes';
import roleRoutes from './src/modules/role/routes';
import userRoutes from './src/modules/user/routes';
import memberRoutes from './src/modules/member/routes';

const router = express.Router();

export default () => {
  router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
  });

  router.get('/api', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
  });

  router.use(authRoutes());
  router.use(actionRoutes());
  router.use(roleRoutes());
  router.use(userRoutes());
  router.use(memberRoutes());

  return router;
};

// @TODO
// const ROUTES_PATH = './modules/**/routes.js';

//   pathUtils.getGlobbedPaths(path.join(__dirname, ROUTES_PATH)).forEach((routePath) => {
//     require(path.resolve(routePath))(app, passport);
//   });