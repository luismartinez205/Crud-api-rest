import { Router } from 'express';
import { login , profile,logout } from '../controllers/login.controller.js';
import {verifyToken} from '../midlewares/verifyToken.js';
import { validateBody } from '../midlewares/validateBody.js';
import { loginSchema } from '../schemas/login.schemas.js';
import { validateSearch } from '../midlewares/validateSearch.js';
const router = Router();

router.post('/login',validateBody(loginSchema), login);
router.post('/logout',validateBody(loginSchema), logout);
router.get('/profile',verifyToken,validateSearch(loginSchema), profile);

export default router;