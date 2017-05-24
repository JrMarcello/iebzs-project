'use strict';

import User from './schema';

export default {
    create: (data, callback) => {
        new User(data).save(callback);
    },
    update: (id, data, callback) => {
        User.findByIdAndUpdate({ _id: id }, data, callback);
    },
    delete: (id, callback) => {
        User.findByIdAndRemove({ _id: id }, callback);
    },
    get: (id, callback) => {
        User.findOne({ _id: id }, callback);
    },
    getAll: (callback) => {
        User.find(callback);
    }
}
