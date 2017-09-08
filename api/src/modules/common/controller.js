/* eslint arrow-body-style:0 */
import { logInfo } from '../../common/utils';

export default (model) => {
  return {
    create: (req, res) => {
      logInfo('[/POST] HTTP Request :: create method');

      model.create(req.body, (err, data) => {
        if (err) res.status(500).json(err);

        res.status(200).json(data);
      });
    },
    update: (req, res) => {
      logInfo('[/PUT] HTTP Request :: update method');

      model.update(req.params.id, req.body, (err, data) => {
        if (err) res.status(500).json(err);

        res.status(200).json(data);
      });
    },
    delete: (req, res) => {
      logInfo('[/DELETE] HTTP Request :: delete method');

      model.delete(req.params.id, (err, data) => {
        if (err) res.status(500).json(err);

        res.status(200).json(data);
      });
    },
    get: (req, res) => {
      logInfo('[/GET] HTTP Request :: get method');

      model.get({ _id: req.params.id }, (err, data) => {
        if (err) res.status(500).json(err);

        res.status(200).json(data);
      });
    },
    getAll: (req, res) => {
      logInfo('[/GET] HTTP Request :: getAll method');

      model.getAll({}, (err, data) => {
        if (err) res.status(500).json(err);

        res.status(200).json(data);
      });
    }
  };
};
