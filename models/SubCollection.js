import { Schema  } from "mongoose";

export const SubCollectionSchema = new Schema({
    parent_id: {
        type:Schema.Types.ObjectId,
        ref:'Collections',
        require:true
    },
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
   title_en: {
    type:String,
    require:true
   },
   enabled: {
    type:Boolean,
    default:true
   },
   media: {
    type:String,
    require:true
   }
}) 