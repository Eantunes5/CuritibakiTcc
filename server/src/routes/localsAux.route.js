import { Router } from 'express';
import localsAuxController from '../controllers/localsAux.controller.js';
import {validId,validLocalAux}  from '../middlewares/global.middlewares.js';

const router = Router();

router.post('/', localsAuxController.create);
router.get('/', localsAuxController.findAll);
router.get('/:id',validId,validLocalAux, localsAuxController.findById);
router.patch('/:id',validId,validLocalAux, localsAuxController.update);
router.delete('/:id',validId, localsAuxController.deleteById);

export default  router;