/* eslint arrow-body-style:0 */
export default (Schema) => {
  return {
    create: (data, callback) => {
      new Schema(data).save(callback);
    },
    update: (id, data, callback) => {
      Schema.findByIdAndUpdate({ _id: id }, data, callback);
    },
    delete: (id, callback) => {
      Schema.findByIdAndRemove({ _id: id }, callback);
    },
    get: (query, options, callback) => {
      let localOptions = { __v: 0 };

      if (typeof options === 'function') {
        callback = options;
      } else {
        localOptions = options ? Object.assign(localOptions, options) : localOptions;
      }

      Schema.findOne(query, localOptions).lean().exec(callback);
    },
    getAll: (query, options, callback) => {
      let localOptions = { __v: 0 };

      if (typeof options === 'function') {
        callback = options;
      } else {
        localOptions = options ? Object.assign(localOptions, options) : localOptions;
      }

      Schema.find(query, localOptions).lean().exec(callback);
    }
  };
};
