import { Router } from 'express'
import conquestsController from '../controllers/conquests.controller.js';
import {validId,validConquest}  from '../middlewares/global.middlewares.js';

const router = Router();

router.post('/', conquestsController.create);
router.get('/', conquestsController.findAll);
router.get('/:id',validId,validConquest, conquestsController.findById);
router.patch('/:id',validId,validConquest, conquestsController.update);
router.delete('/:id',validId,validConquest, conquestsController.deleteById);

export default router;