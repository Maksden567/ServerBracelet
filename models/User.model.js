import { Schema } from "mongoose";

const UserSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true
    }
})

export default UserSchema