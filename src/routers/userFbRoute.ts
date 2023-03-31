import { Router } from 'express';
import userFbController from '../controller/userFbController';
import auth from '../controller/auth/auth';

const router = Router();

router.post('/add/user', userFbController.registerUser);
router.get('/get/all', userFbController.getUser);
router.post('/delete/:id', userFbController.deleteUser);
router.post('/update/:id', userFbController.updateUser);

//Auth route

router.get('/auth/get', auth.listUser);
router.post('/sign-in', auth.createUser);
router.get('/auth/view/user', auth.viewUser);
router.post('/auth/update/:id', auth.updateUser);
router.post('/auth/delete/:id', auth.deleteUser);
router.post('/login', auth.login);


export = router;