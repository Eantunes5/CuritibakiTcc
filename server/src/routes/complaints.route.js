import { Router } from 'express';
import complaintsController from '../controllers/complaints.controller.js';
import {validComplaints, validId}  from '../middlewares/global.middlewares.js';

const router = Router();

router.post('/', complaintsController.create);
router.get('/', complaintsController.findAll);
router.get('/:id',validId,validComplaints, complaintsController.findById);
router.patch('/:id',validId,validComplaints, complaintsController.update);
router.delete('/:id',validId, complaintsController.deleteById);

export default  router;