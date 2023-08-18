import nodemailer from 'nodemailer'
import 'dotenv/config'

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIN_EMAIL,
        pass: process.env.PASSWORD_EMAIL,
    },
});

 const send = async(toArr,subject,html) =>{
    await transporter.sendMail({
        to:toArr,
        from:process.env.FROM_EMAIL,
        subject,
        text:'',
        html
        
    })}

    export default send
