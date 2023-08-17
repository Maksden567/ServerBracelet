import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const authMiddleware = (req,res,next) => {

    try {

        const token = req.headers.authorization

        if(!token){
            return res.status(400).json('Помилка при вході  систему')
        }
    
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
    
        
        req.user=decoded
        next()
    } catch (error) {
        
        return res.status(400).json('Помилка при вході  систему')

    }

   
}

