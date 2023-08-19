import { Schema } from "mongoose";

export const ProductSchema = new Schema({
    name_ua:{
        type:String,
        require:true
    },
    name_en:{
        type:String,
        require:true
    },
    fullPrice:{
        type:Number,
        require:true
    },
    article:{
        type:String,
        require:true
    },

    collection_id:{
        type:Schema.Types.ObjectId,
        ref:'Collection',
        require:true
    },
    category_id:{
        type:Schema.Types.ObjectId,
        ref:'Categories',
        require:true
    },
    size:[Number],

    description_ua:[String],
    description_en:[String],

    media:{
        images:[String],
        video:[String],
        require:true
    },

    recommended:{
        type:Boolean,
        default:false,
        require:true
    },
    enabled:{
        type:Boolean,
        default:true
    }






})