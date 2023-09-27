import { Router } from 'express'; 
import { verificarEnviarEmailController } from '../controllers/auth.controller.js';

const router = Router();

import { login } from '../controllers/auth.controller.js';

router.post("/", login);
router.post("/verificar-email", verificarEnviarEmailController);

export default router;