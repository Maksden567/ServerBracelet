
 export const allowMiddleware = (permisions) => {
    return (req,res,next)=>{

        const userRole = req.user.role
        if(permisions.includes(userRole)){
            next()
        }
        else{
            return res.status(400).json('Ви не маєте достатньо прав для цього')
        }

    }
}

