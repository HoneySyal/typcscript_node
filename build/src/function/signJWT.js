"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signJWT = (user, callback) => {
    var timeSinceEpoch = new Date().getTime();
    var expirationTime = timeSinceEpoch + Number(3600) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);
    const secretKey = 'qwertuihxnxhxhx';
    const issuer = 'coolIssuer';
    try {
        jsonwebtoken_1.default.sign({
            email: user.email
        }, secretKey, {
            issuer: issuer,
            algorithm: 'HS256',
            expiresIn: expirationTimeInSeconds
        }, (error, token) => {
            if (error) {
                callback(error, null);
            }
            else if (token) {
                callback(null, token);
            }
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = signJWT;
