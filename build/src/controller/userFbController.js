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
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("../config/firebase");
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const user = firebase_1.db.collection('user').doc();
    yield user.set({
        name, email, password
    });
    res.status(200).send({
        message: 'New user added'
    });
});
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = firebase_1.db.collection('user').doc();
    const data = yield user.get();
    if (!data.exists) {
        return res.status(400).json({ message: 'no data found' });
    }
    res.status(200).json({
        user: data.data()
    });
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = firebase_1.db.collection('user');
    yield user.doc(id).delete();
    res.send({ msg: " User Deleted" });
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const id = req.params.id;
    const user = firebase_1.db.collection('user').doc(id);
    yield user.set({
        name, email, password
    });
    res.status(200).send({
        message: 'User updated'
    });
});
exports.default = {
    registerUser, getUser, deleteUser, updateUser
};
