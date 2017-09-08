import actions from './actions';
import { logInfo } from '../../common/utils';

export default {
  getAll: (request, response) => {
    logInfo('[/GET] HTTP Request :: getAll method');

    return response.json(actions);
  },
};
