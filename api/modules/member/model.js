'use strict';

import Member from './schema';

export default {
    create: (data, callback) => {
        new Member(data).save(callback);
    },
    update: (id, data, callback) => {
        Member.findByIdAndUpdate({ _id: id }, data, callback);
    },
    delete: (id, callback) => {
        Member.findByIdAndRemove({ _id: id }, callback);
    },
    get: (id, callback) => {
        Member.findOne({ _id: id }, callback);
    },
    getAll: (callback) => {
        Member.find(callback);
    }
};
