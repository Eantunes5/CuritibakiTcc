import { Router } from 'express'
import emergencyController from '../controllers/emergency.controller.js';
import {validId,validUser, validEmail}  from '../middlewares/global.middlewares.js';

const router = Router();

router.post('/', emergencyController.create);
router.get('/', emergencyController.findAll);
router.get('/:id', emergencyController.findById);
router.patch('/:id', emergencyController.update);
router.delete('/:id', emergencyController.deleteById);

export default  router;