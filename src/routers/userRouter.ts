import { Router } from 'express';

import userController from '../controller/userController';
import extractJWT from '../middleware/extractJWT';

const router = Router();

router.get('/validate', extractJWT, userController.validateToken);
router.post('/register', userController.registerUser);
router.post('/login', userController.login);
router.get('/get/all', userController.getAllUser);
router.post('/admin-route/:id', userController.roleAuth)

export = router;