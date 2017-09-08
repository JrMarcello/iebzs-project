/* eslint arrow-body-style:0 */
import passport from 'passport';
import jwt from 'jsonwebtoken';
import jwtStrategy from './strategy';
import configs from '../../../config/configs';

passport.initialize();
jwtStrategy(passport);

export const getToken = (user, callback) => {
  try {
    const tokenParams = {
      id: user._id,
      name: user.name,
      email: user.email,
      img: user.avatar,
      role: user.role
    };

    const options = { algorithm: 'HS256', expiresIn: '1d' };

    return callback(null, { token: jwt.sign(tokenParams, configs.auth.jwtSecret, options) });
  } catch (err) {
    return callback(err);
  }
};

export const isAuthorized = () => {
  return passport.authenticate('jwt', { session: false });
};
