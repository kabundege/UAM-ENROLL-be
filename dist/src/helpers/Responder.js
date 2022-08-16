"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = exports.SuccessResponse = void 0;
const SuccessResponse = (res, status, message, data) => {
    return res.status(status).json({
        data,
        status,
        message
    });
};
exports.SuccessResponse = SuccessResponse;
const ErrorResponse = (res, status, error, extra) => {
    const message = extra || new Error(error);
    //
    return res.status(status).json({
        error,
        status,
        message,
    });
};
exports.ErrorResponse = ErrorResponse;
//# sourceMappingURL=Responder.js.map