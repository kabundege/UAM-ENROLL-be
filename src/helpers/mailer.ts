import nodemailer from 'nodemailer'
import logging from '../config/logging';

const user = process.env.EMAIL
const pass = process.env.PASSWORD

const transporter = nodemailer.createTransport({
    host: 'smtp.outlook.com',
    auth: { user, pass }
});

export const SendEmail = async (to:string,subject:string,html:string) => {

    const mailOptions = {
        from: user, // sender address
        to, // list of receivers
        subject, // Subject line
        html// plain text body
    };
  
    return new Promise((res,rej)=>{
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
            rej(logging.error('NodeMailer', err.message, err))
            else
            res(logging.info('NodeMailer', info.response, info))
        });
    }) 
}