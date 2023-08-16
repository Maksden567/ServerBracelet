import mongoose from "mongoose"
import UserSchema from "../models/User.model.js"
import bcrypt from "bcrypt"

class AuthController {
    async registerUser(req,res){
        const {name,password,role}=req.body
        const User=mongoose.model('User',UserSchema)
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);
        const isCheckUser=await User.find({name:name})
        if(isCheckUser){
            return res.status(400).json('Такий юзер є в системі')
        }
        const user= new User({
            name:name,
            password:passwordHash,
            role:role
        })
        
        await user.save()
        res.json(user)
    }
    async changePassword(req,res){
        const {password}=req.body
        const {id}=req.params
        const User=mongoose.model('User',UserSchema)
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);
        const user=await User.findByIdAndUpdate(id,{password:passwordHash})
        await user.save()
        res.json(user)
    }
    async getUsers(req,res){
        // const {name,password}=req.body
        const User=mongoose.model('User',UserSchema)
        
        const users= await User.find()
        
        res.json(users)
    }
}

export default new AuthController