import { ObjectSchema } from '@hapi/joi';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../helpers/Responder';
import { SignUp, Verification } from '../schemas';

dotenv.config();

class Validators {

  private handler = (req:Request,res:Response,schema:ObjectSchema) => {
      const { error } = schema.validate(req.body);
        
      if ( error ) {
        if (
          error.details[0].message
            .replace('/', '')
            .replace(/"/g, '')
            .includes('fails to match the required')
        ) {
            let msg= 'Incorrect use of special characters',
            tip: `Please avoid characters that looks like = or /`;
    
          return ErrorResponse(res, 400, msg, tip)
        }
    
        const Error = error.details[0].message.replace('/', '').replace(/"/g, '');
        return ErrorResponse(res, 400, Error)
      }else{
        return 1;
      }
            
    }

  SignUpValidation = (req:Request, res:Response, next:NextFunction) => { 
    const result = this.handler(req,res,SignUp)
      
    return result === 1 ? next() : null
  }

  CodeValidation = (req:Request, res:Response, next:NextFunction) => { 
    const result  = this.handler(req,res,Verification)
      
    result === 1 ? next() : null
  }

}

export default new Validators()
