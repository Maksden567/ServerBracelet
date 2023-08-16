
 export const allowsMiddleware = (permisions) => {
    return (req,res,next)=>{

        const userRole = req.user.role

        if(permisions.includes(userRole)){
            next()
        }
        else{
            return res.json('Ви не маєте достатньо прав для цього')
        }

    }
}

