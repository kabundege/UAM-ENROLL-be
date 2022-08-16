"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("../controller"));
const authenticate_1 = require("../middlewares/authenticate");
const validate_1 = __importDefault(require("../middlewares/validate"));
const route = (0, express_1.Router)();
const { SignUpValidation, CodeValidation } = validate_1.default;
/** User APIs */
route.get('/', controller_1.default.WelcomeApi);
route.post('/signup', SignUpValidation, controller_1.default.Signup);
route.get('/verify-account', authenticate_1.AuthCheck, CodeValidation, controller_1.default.Verification);
exports.default = route;
//# sourceMappingURL=index.js.map