/* eslint-disable */
import service from './index';

const BASE_PATH = `${process.env.API_URL}/user`;
const resource = service.resource(`${BASE_PATH}{/id}`);

export default {
  getAll() {
    return resource.get({});
  },
  getOne(id) {
    return resource.get({ id });
  },
  updateOne(user) {
    return resource.update({ id: user._id }, user);
  },
  register(user) {
    return resource.save(user);
  },
  delete(userId) {
    return resource.delete({ id: userId });
  },
};
