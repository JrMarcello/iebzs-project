'use strict'

import bcrypt from 'bcryptjs';

import User from '../user/schema';
import auth from './auth';

export default {
    login: (data, callback) => {
        if ( ! validate(data)) { return callback(new Error('Invalid email or password')) }

        return authenticate(data, callback);
    }
}

function validate(data) {
    if ( ! data.hasOwnProperty('email') || ! data.hasOwnProperty('password')) {
         return false
    }

    return true;
}

function authenticate(data, callback) {
    let query = { email: data.email, password: bcrypt.hashSync(data.password) };
    //console.log(query)
    User.findOne(query, (err, user) => {
        if (err) { return callback(err) }
        
        if ( ! user) { return callback(new Error('Invalid email or password')) }

        return auth.getToken(user, callback);
    });
}