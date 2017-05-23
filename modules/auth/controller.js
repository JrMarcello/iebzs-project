'use strict'

import model from './model';

export default {
    login: (req, res) => {
        model.login(req.body, (err, data) => {            
            if (err) { res.status(500).json(err) }

            res.status(200).json(data);
        });
    }
}
