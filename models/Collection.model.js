
import {Schema} from 'mongoose'

export const CollectionSchema = new Schema({
    name_ua:{
        type:String,
        require:true
    },
    name_en:{
        type:String,
        require:true
    },
    title_ua:{
        type:String,
        require:true
    },
    title_en:{
        type:String,
        require:true
    },
    enabled:{
        type:Boolean,
        require:true,
        default:true
    },
    media:{
        type:String,
        require:true
    }
})