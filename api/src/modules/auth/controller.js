import { errorHandler } from '../../common/utils';
import model from './model';

export default {
  login: (req, res) => {
    model.login(req.body, (err, data) => {
      if (err) res.status(401).json(errorHandler(err));

      res.status(200).json(data);
    });
  }
};
