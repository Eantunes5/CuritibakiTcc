import { Router } from 'express'
import ratingController from '../controllers/rating.controller.js';
import {validId,validRating}  from '../middlewares/global.middlewares.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/',authMiddleware, ratingController.create);
router.get('/', ratingController.findAll);
router.get('/:id_local',validRating, ratingController.findById);
router.patch('/:id',validId, ratingController.update);
router.delete('/:id',validId, ratingController.deleteById);
router.delete('/delete/:id',validId, ratingController.deleteById2);

export default  router;