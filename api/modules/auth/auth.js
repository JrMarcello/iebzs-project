'use strict';

import passport    from 'passport';
import passportJWT from 'passport-jwt';
import jwt         from 'jsonwebtoken';

import configs from '../../config/configs';
import User    from '../user/schema';

const secret = configs.auth.jwtSecret;

let params = {
    secretOrKey: secret,
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeader()
};

passport.use(new passportJWT.Strategy(params, (payload, done) => {
    User.findOne({ _id: payload.id }, (err, user) => {
        if (err) return done(err);

        if ( ! user) return done(null, false);

        return done(null, user);
    });
}));

passport.initialize();

export default passport;

/**
 * Create a token
 * 
 * @param {*} user
 * @param {*} callback
 */
export const getToken = (user, callback) => {
    try {
        let params = { id: user._id };
        let options = { algorithm: 'HS256', expiresIn: '1d' };

        return callback(null, { token: jwt.sign(params, secret, options) });
    } catch (err) {
        return callback(err);
    }
};

export const isAuthorized = () => {
    return passport.authenticate('jwt', configs.auth.jwtSession);
};
