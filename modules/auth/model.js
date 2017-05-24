'use strict';

import bcrypt from 'bcryptjs';

import User from '../user/schema';
import { getToken } from './auth';

export default {
    login: (data, callback) => {
        if ( ! validate(data)) { return callback(new Error('Invalid email or password')) }

        User.findOne({ email: data.email }, (err, user) => {
            if (err) { return callback(err) }

            if ( ! user) { return callback(new Error('Invalid email')) }

            if ( ! bcrypt.compareSync(data.password, user.password)) { return callback(new Error('Invalid password')) }

            return getToken(user, callback);
        });
    }
};

function validate(data) {
    if ( ! data.hasOwnProperty('email') || ! data.hasOwnProperty('password')) {
         return false;
    }

    return true;
}
