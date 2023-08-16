
 export const allowMiddleware = (permisions) => {
    return (req,res,next)=>{

        const userRole = req.user.role
        console.log(userRole)
        if(permisions.includes(userRole)){
            next()
        }
        else{
            return res.json('Ви не маєте достатньо прав для цього')
        }

    }
}

