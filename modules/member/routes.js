import express from 'express';

import controller from './controller';

const API_MEMBER_BASE_PAH = '/member';

const router = express.Router();

router.route(API_MEMBER_BASE_PAH)
    .post(controller.create)    
    .get(controller.getAll);

router.route(API_MEMBER_BASE_PAH + '/:id')
    .get(controller.get)
    .put(controller.update)    
    .delete(controller.delete);
 
export default router;