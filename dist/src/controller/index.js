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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Responder_1 = require("../helpers/Responder");
const User_1 = __importDefault(require("../Models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mailer_1 = require("../helpers/mailer");
const Code_1 = __importDefault(require("../Models/Code"));
var AccountStatus;
(function (AccountStatus) {
    AccountStatus[AccountStatus["UNVERIFIED"] = 0] = "UNVERIFIED";
    AccountStatus[AccountStatus["PENDING_VERIFICATION"] = 1] = "PENDING_VERIFICATION";
    AccountStatus[AccountStatus["VERIFIED"] = 2] = "VERIFIED";
})(AccountStatus || (AccountStatus = {}));
class Auth {
}
exports.default = Auth;
_a = Auth;
Auth.WelcomeApi = (_, res) => {
    //
    return (0, Responder_1.SuccessResponse)(res, 200, 'Welcome to enrollment microservice');
};
Auth.Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Part 1.
        const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, 10);
        const userPayload = new User_1.default(Object.assign(Object.assign({}, req.body), { hasTwoFactorAuth: false, password: hashedPassword, status: AccountStatus.VERIFIED, _id: new mongoose_1.default.Types.ObjectId() }));
        /** Save a new User */
        const user = yield userPayload.save();
        const { phoneNumber, email, _id: userId } = user;
        // Part 2 ~ Confirm Account Creation
        const min = 100000, max = 999999;
        const code = Math.floor(Math.random() * (max - min) + min);
        const html = `
                <html>
                    <head>
                        <link rel="stylesheet" href="index.css">
                    </head>
                    <body>
                        <script src="index.pack.js"></script>
                        <div style="display:flex;flex-direction:column;align-items:center">
                            <h1>UAM - Verification</h1>
                            <p style="color:#999;text-align:center;margin:2em">Use the six digit code provided below to verify you account</p>
                            <h4>${code}</h4>
                        </div>
                    </body>
                </html>
            `;
        /** Send Email */
        yield (0, mailer_1.SendEmail)(req.body.email, 'UAM ~ Account Verification', html);
        /** save the code & associate with user by id */
        const codePayload = new Code_1.default({ userId, code });
        const newCode = yield codePayload.save();
        const token = jsonwebtoken_1.default.sign({ email, phoneNumber }, process.env.JWT_SECRET);
        return (0, Responder_1.SuccessResponse)(res, 201, 'Signup Successful', { token, user });
    }
    catch (error) {
        return (0, Responder_1.ErrorResponse)(res, 500, error);
    }
});
Auth.Verification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exists = yield Code_1.default.findOne({ userId: req.userData._id }).exec();
        if (!exists || exists.code !== req.body.code) {
            return (0, Responder_1.ErrorResponse)(res, 400, "Invalid Code");
        }
        /** Delete the existing code from the db */
        (yield Code_1.default.findById(exists._id)).delete().exec();
        /** Verify email */
        const user = yield User_1.default.findOne({ email: req.userData.email }).update({ status: AccountStatus.PENDING_VERIFICATION }).exec();
        return (0, Responder_1.SuccessResponse)(res, 200, 'Reset Successful', user);
    }
    catch (error) {
        return (0, Responder_1.ErrorResponse)(res, 500, error);
    }
});
//# sourceMappingURL=index.js.map