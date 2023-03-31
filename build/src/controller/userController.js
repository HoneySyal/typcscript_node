"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../model/userModel"));
const signJWT_1 = __importDefault(require("../function/signJWT"));
const validation_1 = require("../middleware/validation");
const roleAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = yield userModel_1.default.findById(id);
        if (data != null) {
            if (data.role == 'admin') {
                res.json({
                    message: 'Welcome Admin',
                });
            }
            else {
                res.json({
                    error: 'Access denied',
                    message: 'Only Admin can access this route',
                });
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
const validateToken = (req, res, next) => {
    res.json({
        message: 'Authorized'
    });
};
const registerUser = (req, res, next) => {
    const { error } = (0, validation_1.registerValidation)(req.body);
    if (error)
        return res.status(400).json({ error: error.details[0].message });
    let { email, password } = req.body;
    bcryptjs_1.default.hash(password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({
                message: err.message,
                error: err
            });
        }
        const _user = new userModel_1.default({
            // _id: new mongoose.Types.ObjectId(),
            email,
            password: hash
        });
        return _user.save().then((user) => {
            return res.status(201).json({
                message: 'User Added',
                data: user
            });
        })
            .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error: error
            });
        });
    });
};
const login = (req, res, next) => {
    const { error } = (0, validation_1.loginValidation)(req.body);
    if (error)
        return res.status(400).json({ error: error.details[0].message });
    let { email, password } = req.body;
    userModel_1.default.find({ email })
        .exec()
        .then((users) => {
        if (users.length !== 1) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        bcryptjs_1.default.compare(password, users[0].password, (error, result) => {
            if (error) {
                return res.status(401).json({
                    message: 'Password Mismatch'
                });
            }
            else if (result) {
                (0, signJWT_1.default)(users[0], (_error, token) => {
                    if (_error) {
                        return res.status(500).json({
                            message: _error.message,
                            error: _error
                        });
                    }
                    else if (token) {
                        return res.status(200).json({
                            message: 'Auth successful',
                            token: token,
                            user: users[0]
                        });
                    }
                });
            }
        });
    })
        .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error: error
        });
    });
};
const getAllUser = (req, res, next) => {
    userModel_1.default.find()
        .select('-password')
        .exec()
        .then((users) => {
        return res.status(200).json({
            users: users,
            count: users.length
        });
    })
        .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
};
exports.default = {
    validateToken,
    registerUser,
    login,
    getAllUser,
    roleAuth
};
