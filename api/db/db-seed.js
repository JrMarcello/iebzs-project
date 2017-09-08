/* eslint no-useless-return:0, arrow-body-style:0 */
import Role from '../src/modules/role/model';
import roles from '../src/modules/role/roles';
import User from '../src/modules/user/model';
import constants from '../src/common/constants';

const populate = () => {
  return new Promise((resolve, reject) => {
    _createDefaultRoles()
      .then(() => {
        _createAdminUser()
          .then(() => {
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default populate;

/**
 * Create Roles default
 *
 * @private
 * @returns {Promise} -  Return a promise
 */
function _createDefaultRoles() {
  return new Promise((resolve, reject) => {
    Object.keys(roles).forEach((key) => {
      Role.get({ name: roles[key].name }, (err, role) => {
        if (err) {
          reject(err);
          return;
        }

        if (!role) {
          Role.create(roles[key], (createErr) => {
            if (createErr) {
              reject(createErr);
              return;
            }
          });
        }
      });
    });

    resolve();
  });
}

/**
 * Create Admin user, if not exists
 *
 * @private
 * @returns {Promise} - Return promisse
 */
function _createAdminUser() {
  return new Promise((resolve, reject) => {
    User.get({ email: 'admin@admin.com' }, (err, user) => {
      if (err) {
        reject(err);
        return;
      }

      if (!user) {
        Role.get({ name: 'ADMIN' }, (errRole, adminRole) => {
          if (errRole) {
            reject(errRole);
            return;
          }

          if (!adminRole) {
            reject(new Error(constants.role.error.ROLE_NOT_FOUND));
            return;
          }

          const admin = {
            name: {
              first: 'Administrador',
              last: null,
            },
            email: 'admin@admin.com',
            password: '1a2b3c',
            avatar: null,
            role_id: adminRole._id,
          };

          User.create(admin, (errUser) => {
            if (errUser) {
              reject(errUser);
              return;
            }

            resolve();
          });
        });
      }
    });
  });
}
