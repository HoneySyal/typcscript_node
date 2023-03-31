"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const joi_1 = __importDefault(require("joi"));
//validations
const registerValidation = (data) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string()
            .email()
            .required(),
        password: joi_1.default.string()
            .min(6)
            .max(10)
            .required()
    });
    return schema.validate(data);
};
exports.registerValidation = registerValidation;
//login validations
const loginValidation = (data) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string()
            .email()
            .required(),
        password: joi_1.default.string()
            .min(6)
            .max(10)
            .required()
    });
    return schema.validate(data);
};
exports.loginValidation = loginValidation;
module.exports.registerValidation = exports.registerValidation;
module.exports.loginValidation = exports.loginValidation;
