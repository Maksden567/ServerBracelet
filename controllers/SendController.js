import send from "../mailer/mailer.js"


class SendLetter  {

    async send(req,res){
        const {to,subject,html}=req.body
        if(!to||!subject||!html){
            return res.status(403).json("Не достатнбо обовязкових параметрів")
        }
        await send(to,subject,html)
        return res.json("Лист успішно відправлено")
    }

}

export default new SendLetter

