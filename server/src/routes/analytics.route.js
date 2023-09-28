import { Router } from 'express';
import analyticsController from '../controllers/analytics.controller.js';
import {validId,validAnalytics}  from '../middlewares/global.middlewares.js';

const router = Router();

router.post('/', analyticsController.create);
router.get('/', analyticsController.findAll);
router.get('/:id',validId,validAnalytics, analyticsController.findById);
router.patch('/:id',validId,validAnalytics, analyticsController.update);
router.delete('/:id',validId, analyticsController.deleteById);

export default  router;