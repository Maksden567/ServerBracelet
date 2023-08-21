
import {Schema} from 'mongoose'


export const GallerySchema = new Schema({
    title_ua:{
        type:String,
        require:true,
        
    },
    title_en:{
        type:String,
        require:true,
        
    },
    name_ua:{
        type:String,
        require:true,
        
    },
    name_en:{
        type:String,
        require:true,
        
    },
    enabled:{
        type:Boolean,
        default:true
    },
    images:{
        type:[
            {
                enabled:{
                    type:Boolean,
                    default:true
                },
                link:{
                    type:String,
                    require:true,
                }
            }
        ],
        require:true
    },
    media:{
        type:String,
        require:true
    }
})