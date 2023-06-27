import { Router } from 'express'
import emergencyController from '../controllers/emergency.controller.js';
import {validId,validEmergency}  from '../middlewares/global.middlewares.js';

const router = Router();

router.post('/', emergencyController.create);
router.get('/', emergencyController.findAll);
router.get('/:id',validId,validEmergency, emergencyController.findById);
router.patch('/:id',validId,validEmergency, emergencyController.update);
router.delete('/:id',validId,validEmergency, emergencyController.deleteById);

export default  router;