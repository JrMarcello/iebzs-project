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
        if (err) { return done(err) }

        if ( ! user) { return done(null, false) }

        return callback(null, user);            
    });
}));

passport.initialize();

export default passport;

export let getToken = (user, callback) => {
    try {
        let params = { id: user._id };
        let options = { algorithm: 'HS256', expiresIn: '1d' };        

        return callback(null, jwt.sign(params, secret, options));
    } catch (err) {
        return callback(err);
    }
};