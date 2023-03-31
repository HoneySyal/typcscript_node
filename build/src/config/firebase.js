"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.serviceAccount = void 0;
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
exports.serviceAccount = require('../key.json');
(0, app_1.initializeApp)({
    credential: firebase_admin_1.default.credential.cert(exports.serviceAccount),
});
exports.db = (0, firestore_1.getFirestore)();
//  const user = db.collection('user').doc();
