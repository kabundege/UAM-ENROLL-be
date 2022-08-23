import { Request,Response } from 'express'
import mongoose from 'mongoose'
import { ErrorResponse, SuccessResponse } from '../helpers/Responder';
import { AuthInfoRequest } from '../../types';
import User from '../Models/User'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { SendEmail } from '../helpers/mailer';
import Code from '../Models/Code';

enum AccountStatus { UNVERIFIED, PENDING, VERIFICATION, VERIFIED }

export default class Auth {

    static WelcomeApi = (_:Request, res: Response) => {
        //
        return SuccessResponse(res,200,'Welcome to enrollment microservice')
    }

    static Signup = async (req:Request,res:Response) =>{

        try{

            /** check if user already exist */
            const { email,password } = req.body

            const exists = await User.findOne({ email }).exec()
   
            if(exists){
                return ErrorResponse(res,409,'User Already Exists')
            }
            
            // Part 1.
            const hashedPassword = await bcrypt.hash(password, 10);

            const userPayload = new User({
                ...req.body,
                hasTwoFactorAuth: false,
                password: hashedPassword,
                status: AccountStatus.VERIFIED,
                _id: new mongoose.Types.ObjectId(),
            })

            /** Save a new User */
            const user = await userPayload.save() 
            const { phoneNumber,_id:userId } = user

            // Part 2 ~ Confirm Account Creation
            const min = 100000,max=999999;
            const code = Math.floor(Math.random() * (max - min) + min)

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
            await SendEmail(req.body.email, 'UAM ~ Account Verification', html)

            /** save the code & associate with user by id */
            const codePayload = new Code({ userId,code })
            await codePayload.save()

            const token = jwt.sign({ email, phoneNumber },process.env.JWT_SECRET)

            return SuccessResponse(res,201,'Signup Successful', { token })
        }catch(error){
            return ErrorResponse(res,500,error)
        }
     
    }

    static Verification = async (req:AuthInfoRequest,res:Response) =>{

        try{

            const exists = await Code.findOne({ userId:req.userData._id }).exec()

            if(!exists || exists.code !== req.body.code){
                return ErrorResponse(res,400,"Invalid Code")
            }
            /** Delete the existing code from the db */
            await Code.deleteOne({ userId:req.userData._id }).exec()
            /** Verify email */
            await User.updateOne({ _id:req.userData._id },{ status: AccountStatus.VERIFIED.toString() }).exec()

            const user  = await User.findOne({ email:req.userData.email }).exec()

            return SuccessResponse(res,200,'Verification Successful',{ user })
        }catch(error){
            return ErrorResponse(res,500,error)
        }
    }

}

