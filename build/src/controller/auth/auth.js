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
const auth_1 = require("firebase/auth");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// import { serviceAccount } from '../../config/firebase';
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    try {
        yield firebase_admin_1.default.auth().createUser({
            email: email,
            emailVerified: false,
            password: password,
            disabled: false
        });
        res.json({ message: 'User Created' });
    }
    catch (err) {
        console.log(err);
        res.json({
            message: 'Error creating user',
            error: err
        });
    }
});
const listUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const usersResult = yield firebase_admin_1.default.auth().listUsers(1000);
    res.json(usersResult.users);
});
const login = (req, res, next) => {
    const auth = (0, auth_1.getAuth)();
    const email = req.body.email;
    const password = req.body.password;
    (0, auth_1.signInWithEmailAndPassword)(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        res.json({
            message: 'user Logged in',
            // data: user
        });
    })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.json({
            errorCode: errorCode,
            errorMessage: errorMessage
        });
    });
};
const viewUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield firebase_admin_1.default.auth().getUserByEmail(req.body.email);
        res.json(user);
    }
    catch (err) {
        res.json({ message: 'cannot fetch user data' });
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    try {
        const user = yield firebase_admin_1.default.auth().updateUser(req.params.id, {
            disabled: false,
            email: email,
            emailVerified: false,
        });
        res.json(user);
    }
    catch (e) {
        res.json({ message: e });
    }
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield firebase_admin_1.default.auth().deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
});
exports.default = {
    createUser, listUser, login, viewUser, updateUser, deleteUser
};
