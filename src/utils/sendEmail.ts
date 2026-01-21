import { createTransport } from "nodemailer";
import { htmlMessage } from "./html.message";

export const sendEmail = async (to: string, subject: string, userId: string) => {
    console.log("email sent to", to)

    const transporter = createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    if (!process.env.BACKEND_HOST || !process.env.PORT) {
        throw new Error('HOST or PORT not found in environment variables');
    }

    let VerficationLink = '';
    if (process.env.NODE_ENV === 'development') {
        VerficationLink = `${process.env.BACKEND_HOST}:${process.env.PORT}/auth/verify/${userId}`
    } else if (process.env.NODE_ENV === 'production') {
        VerficationLink = `${process.env.BACKEND_HOST}/auth/verify/${userId}`
    }

    // console.log(VerficationLink)
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to,
        subject,
        html: htmlMessage(VerficationLink),
    };

    await transporter.sendMail(mailOptions);
};
