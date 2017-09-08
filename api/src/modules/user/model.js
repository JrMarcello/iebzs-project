import Schema from './schema';
import parentModel from '../common/model';

const customModel = {
  get: (query, options, callback) => {
    let localOptions = { __v: 0, password: 0 };

    if (typeof options === 'function') {
      callback = options;
    } else {
      localOptions = options ? Object.assign(localOptions, options) : localOptions;
    }

    Schema.findOne(query, localOptions).populate(['role']).lean().exec(callback);
  },
  getAll: (query, options, callback) => {
    let localOptions = { __v: 0, password: 0 };

    if (typeof options === 'function') {
      callback = options;
    } else {
      localOptions = options ? Object.assign(localOptions, options) : localOptions;
    }

    Schema.find(query, localOptions).populate(['role']).lean().exec(callback);
  },
};

export default Object.assign(parentModel(Schema), customModel);
