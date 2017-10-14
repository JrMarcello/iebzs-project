/* eslint-disable */
import service from './index';

const BASE_PATH = `${process.env.API_URL}/role`;
const resource = service.resource(`${BASE_PATH}{/id}`);

export default {
  getAll() {
    return resource.get({});
  },
};
