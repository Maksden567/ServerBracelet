import send from "../mailer/mailer.js"


class SendLetter  {

    async send(req,res){
        const {to,subject,html}=req.body
        await send(to,subject,html)
        return res.json("Лист успішно відправлено")
    }

}

export default new SendLetter

