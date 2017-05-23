'use strict'

//import user from './schema';

export default {
    login: (data, callback) => {
        console.log('Login' + data);
    },
    authenticate: (data, callback) => {
        return passport.authenticate('jwt', { session: false });
    }
}
