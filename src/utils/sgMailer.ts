import { Injectable } from '@nestjs/common';
// import * as sgMail from '@sendgrid/mail';
const sgMail = require('@sendgrid/mail');
import { htmlMessage } from './html.message';

@Injectable()
export class MailService {
    // static sendEmail(email: string, arg1: string, id: string) {
    //     throw new Error('Method not implemented.');
    // }
    constructor() {
        const apiKey = process.env.SENDGRID_API_KEY;
        if (!apiKey) {
            console.error('SENDGRID_API_KEY is missing from environment variables!');
        } else {
            sgMail.setApiKey(apiKey);
        }
    }


    async sendEmail(userEmail: string, subject: string, userId: string) {

        let VerficationLink = '';
        if (process.env.NODE_ENV === 'development') {
            VerficationLink = `${process.env.BACKEND_DEV_HOST}:${process.env.FRONT_END_PORT}/auth/verify/${userId}`
        }else if(process.env.NODE_ENV === 'production'){
            VerficationLink = `${process.env.BACKEND_HOST}/auth/verify/${userId}`
        }
        const msg = {
            to: userEmail,
            from: process.env.SENDGRID_EMAIL as string,
            subject,
            text: 'Please verify your email address',
            html: htmlMessage(VerficationLink),
        };

        try {
            await sgMail.send(msg);
            // console.log('Email sent is ', msg);
        } catch (error) {
            console.error(error);
        }
    }
}