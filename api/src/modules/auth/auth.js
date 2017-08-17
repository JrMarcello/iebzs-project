import passport from 'passport';
import passportJWT from 'passport-jwt';
import jwt from 'jsonwebtoken';

import configs from '../../../config/configs';
import User from '../user/schema';

const secret = configs.auth.jwtSecret;

const params = {
  secretOrKey: secret,
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeader(),
};

passport.use(new passportJWT.Strategy(params, (payload, done) => {
  User.findOne({ _id: payload.id }, (err, user) => {
    if (err) return done(err);

    if (!user) return done(null, false);

    return done(null, user);
  });
}));

passport.initialize();

// export default passport;

/**
 * Create a token
 *
 * @param {*} user - user data
 * @param {*} callback - callback
 * @returns
 */
export const getToken = (user, callback) => {
  try {
    const tokenParams = { id: user._id };
    const options = { algorithm: 'HS256', expiresIn: '1d' };

    return callback(null, { token: jwt.sign(tokenParams, secret, options) });
  } catch (err) {
    return callback(err);
  }
};

export const isAuthorized = () => {
  return passport.authenticate('jwt', configs.auth.jwtSession);
};
