/* eslint no-prototype-builtins:0, arrow-body-style:0 */
import bcrypt from 'bcryptjs';
import { getToken } from './auth-helper';
import User from '../user/model';

export default {
  login: (data, callback) => {
    if (!data.hasOwnProperty('email') || !data.hasOwnProperty('password')) {
      return callback(new Error('Invalid email or password'));
    }

    const query = { email: data.email };
    const fields = { __v: 1, name: 1, email: 1, password: 1, avatar: 1, role_id: 1, role: 1 };

    User.get(query, fields, (err, user) => {
      if (err) return callback(err);

      if (!user || !bcrypt.compareSync(data.password, user.password)) {
        return callback(new Error('Invalid email or password'));
      }

      return getToken(user, callback);
    });
  },
};
