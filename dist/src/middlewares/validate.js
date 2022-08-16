"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const Responder_1 = require("../helpers/Responder");
const schemas_1 = require("../schemas");
dotenv_1.default.config();
class Validators {
    constructor() {
        this.handler = (req, res, schema) => {
            const { error } = schema.validate(req.body);
            if (error) {
                if (error.details[0].message
                    .replace('/', '')
                    .replace(/"/g, '')
                    .includes('fails to match the required')) {
                    let msg = 'Incorrect use of special characters', tip;
                    return (0, Responder_1.ErrorResponse)(res, 400, msg, tip);
                }
                const Error = error.details[0].message.replace('/', '').replace(/"/g, '');
                return (0, Responder_1.ErrorResponse)(res, 400, Error);
            }
            else {
                return 1;
            }
        };
        this.SignUpValidation = (req, res, next) => {
            const result = this.handler(req, res, schemas_1.SignUp);
            return result === 1 ? next() : null;
        };
        this.CodeValidation = (req, res, next) => {
            const result = this.handler(req, res, schemas_1.Verification);
            result === 1 ? next() : null;
        };
    }
}
exports.default = new Validators();
//# sourceMappingURL=validate.js.map