import nodemailer from 'nodemailer'
import logging from '../config/logging';

const user = process.env.EMAIL
const pass = process.env.PASSWORD

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass }
});

export const SendEmail = async (to:string,subject:string,html:string) => {

    const mailOptions = {
        from: user, // sender address
        to, // list of receivers
        subject, // Subject line
        html// plain text body
    };
  
    return transporter.sendMail(mailOptions, function (err, info) {
        if(err)
        logging.error('NodeMailer', err.message, err)
        else
        logging.info('NodeMailer', info.response, info)
    });
}