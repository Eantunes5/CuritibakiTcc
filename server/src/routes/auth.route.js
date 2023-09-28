import { Router } from 'express'; 
import { confirmarEmailController, verificarEnviarEmailController } from '../controllers/auth.controller.js';

const router = Router();

import { login } from '../controllers/auth.controller.js';

router.post("/", login);
router.post("/verificar-email", verificarEnviarEmailController);
router.post("/confirmar-email", confirmarEmailController);

export default router;