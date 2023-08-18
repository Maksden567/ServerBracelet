import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "babadid346@gmail.com",
        pass: "pfxsyvuiavwwspox",
    },
});

 const send = async(toArr,subject,html) =>{
    await transporter.sendMail({
        to:toArr,
        from:'babadid346@gmail.com',
        subject,
        text:'',
        html
        
    })}

    export default send
