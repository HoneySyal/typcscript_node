"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const userFbController_1 = __importDefault(require("../controller/userFbController"));
const auth_1 = __importDefault(require("../controller/auth/auth"));
const router = (0, express_1.Router)();
router.post('/add/user', userFbController_1.default.registerUser);
router.get('/get/all', userFbController_1.default.getUser);
router.post('/delete/:id', userFbController_1.default.deleteUser);
router.post('/update/:id', userFbController_1.default.updateUser);
//Auth route
router.get('/auth/get', auth_1.default.listUser);
router.post('/sign-in', auth_1.default.createUser);
router.get('/auth/view/user', auth_1.default.viewUser);
router.post('/auth/update/:id', auth_1.default.updateUser);
router.post('/auth/delete/:id', auth_1.default.deleteUser);
router.post('/login', auth_1.default.login);
module.exports = router;
