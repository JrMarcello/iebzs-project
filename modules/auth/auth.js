'use strict';

import passport    from 'passport';
import passportJWT from 'passport-jwt';

import configs from '../../config/configs';
import User    from '../user/schema';

let params = {
    secretOrKey: configs.auth.jwtSecret,
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