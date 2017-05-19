'use strict';

import Member from './schema';

module.exports.create = (data, callback) => {        
    new Member(data).save(callback);
};

module.exports.update = (id, data, callback) => {    
    Member.findByIdAndUpdate({ _id: id }, data, callback);   
};

module.exports.delete = (id, callback) => {   
    Member.findByIdAndRemove({ _id: id }, callback);    
};

module.exports.get = (id, callback) => {
    Member.findOne({ _id: id }, callback);    
};

module.exports.getAll = (callback) => {
    Member.find(callback);
};
