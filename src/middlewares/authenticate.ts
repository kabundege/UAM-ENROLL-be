import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { Response,NextFunction } from 'express';
import { ErrorResponse } from '../helpers/Responder';
import User from '../Models/User';
import { AuthInfoRequest } from '../../types';


export const AuthCheck = async (req:AuthInfoRequest, res:Response, next:NextFunction) => {
  try {
    const token = req.header("Authorization");
    const { email } = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET) as  { email:string }
    
    const user = await User.findOne({ email }).exec()

    req.userData = user;
    next();
    
  } catch (error) {
    return ErrorResponse(res, 500, error.name, error.message);
  }
};