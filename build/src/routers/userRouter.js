"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const router = (0, express_1.Router)();
router.get('/validate', extractJWT_1.default, userController_1.default.validateToken);
router.post('/register', userController_1.default.registerUser);
router.post('/login', userController_1.default.login);
router.get('/get/all', userController_1.default.getAllUser);
router.post('/admin-route/:id', userController_1.default.roleAuth);
module.exports = router;
