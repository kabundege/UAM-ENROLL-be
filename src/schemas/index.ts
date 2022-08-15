import Joi from '@hapi/joi';
import { enumToArray } from '../helpers/enumtoArray';

enum MaritalStatus { SINGLE, MARRIED, DIVORCED, WIDOWED }

export const Verification = Joi.object({
    code: Joi.string().required()
});

export const SignUp = Joi.object({
    profilePhoto: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    gender: Joi.string().required(),
    age: Joi.string().required(),
    national_id: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    document: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
    name: Joi.string().pattern(/^[a-zA-Z0-9 *]{3,25}$/).required(),
    maritalStatus: Joi.string().valid(...enumToArray(MaritalStatus)).required(),
    nationality: Joi.string().required(),
});
