/* eslint-disable */
import service from './index';

const API_URL = process.env.API_URL;
const BASE_PATH = `${API_URL}/member`;

const resource = service.resource(`${BASE_PATH}{/id}`);

export default {
  getAll() {
    return resource.get({});
  },
  getOne(id) {
    return resource.get({ id });
  },
  updateOne(product) {
    return resource.update({ id: product.get('_id') }, product);
  },
  register(product) {
    return resource.save(product);
  },
  delete(productId) {
    return resource.delete({ id: productId });
  },
};
