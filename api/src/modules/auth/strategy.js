import passportJWT from 'passport-jwt';

import configs from '../../../config/configs';
import User from '../user/schema';

const strategy = (passport) => {
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
};

export default strategy;
