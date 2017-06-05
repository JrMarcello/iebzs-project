'use strict'

export default (model) => {
    return {
        create: (req, res) => {
            model.create(req.body, (err, data) => {
                if (err) { res.status(500).json(err) }

                res.status(200).json(data);
            });
        },
        update: (req, res) => {
            model.update(req.params.id, req.body, (err, data) => {
                if (err) { res.status(500).json(err) }

                res.status(200).json(data);
            });
        },
        delete: (req, res) => {
            model.delete(req.params.id, (err, data) => {
                if (err) { res.status(500).json(err) }

                res.status(200).json(data);
            });
        },
        get: (req, res) => {
            model.get(req.params.id, (err, data) => {
                if (err) { res.status(500).json(err) }

                res.status(200).json(data);
            });
        },
        getAll: (req, res) => {
            model.getAll((err, data) => {
                if (err) { res.status(500).json(err) }

                res.status(200).json(data);
            });
        }
    }
}
