import mongoose from "mongoose"
import UserSchema from "../models/User.model.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import 'dotenv/config'


class AuthController {
    async registerUser(req,res){
        const {name,password,role}=req.body
        const User=mongoose.model('User',UserSchema)
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);
        const isCheckUser=await User.findOne({name:name})
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
        const {oldpassword,password}=req.body
        if(!oldpassword){
           return res.status(401).json('Не має старого пароля')
        }
        if(!password){
            return res.status(402).json('Не має нового пароля')
         }
        const {id}=req.user
        const User=mongoose.model('User',UserSchema)
        const userCheck= await User.findById(id)
        
        const isCheckPassword= bcrypt.compareSync(oldpassword,userCheck.password)
        if(!isCheckPassword){
            return res.status(403).json('Ви не маєте права змінити пароль')
        }
        
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);
        const user=await User.findByIdAndUpdate(id,{password:passwordHash})
        
        return res.json(user)
    }



    async getUsers(req,res){
       
        const User=mongoose.model('User',UserSchema)
        const users= await User.find()
      
        res.json(users)
    }

    async login(req,res){
        const {name,password}=req.body
        if(!name || ! password){
            return res.status(401).json("Недостатньо даних")
        }
        const User=mongoose.model('User',UserSchema)
        const user=await User.findOne({name:name})
        if(!user){
            return res.status(404).json('Не має такого юзера')
        }
        
        const checkPassword=bcrypt.compareSync(password,user.password)
        if(!checkPassword){
            return res.status(403).json('Не правильно введені дані')
        }
        const id=user.id
        const role=user.role
        const token=jwt.sign({id,role},process.env.JWT_SECRET,{expiresIn:'24h'})

        return res.json({token})
    }
}

export default new AuthController

