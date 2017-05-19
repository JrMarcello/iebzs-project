'use strict'

import Schema from './schema';

module.exports.create = (data, callback) => {        
    new Schema(data).save(callback);
};

module.exports.update = (id, data, callback) => {    
    Schema.findByIdAndUpdate({ _id: id }, data, callback);   
};

module.exports.delete = (id, callback) => {   
    Schema.findByIdAndRemove({ _id: id }, callback);    
};

module.exports.get = (id, callback) => {
    Schema.findOne({ _id: id }, callback);    
};

module.exports.getAll = (callback) => {
    Schema.find(callback);
};
