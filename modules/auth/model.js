'use strict'

//import user from './schema';

export default {
    login: (data, callback) => {        
        if ( ! validate(data)) { return callback(new Error('Invalid email or password'), null) }

        return auth(data, callback);
    }    
}

function validate(data) {
    if ( ! data.hasOwnProperty('email') || ! data.hasOwnProperty('password')) { return false }

    return true;
}

function auth(data, callback) {
    //...
}