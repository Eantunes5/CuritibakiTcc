import { Router } from 'express';
import localsController from '../controllers/locals.controller.js';
import {validId,validLocal}  from '../middlewares/global.middlewares.js';

const router = Router();

router.post('/', localsController.create);
router.get('/', localsController.findAll);
router.get('/:id',validId,validLocal, localsController.findById);
router.get('/nome/:nome', localsController.findAllByName);
router.get('/tipo/:tipo', localsController.findAllByType);
router.patch('/:id',validId,validLocal, localsController.update);
router.delete('/:id',validId, localsController.deleteById);

export default  router;