import {storage} from '../firebase.js'
import  {ref,uploadBytesResumable} from "firebase/storage"
import 'dotenv/config'


class UploadController {
    async upload (req,res){
  
        try {
                const files=req.files
                const products=[]
                for (const item of files) {
                const imageRef = ref(storage, item.originalname);
                const metatype = { contentType: item.mimetype, name: item.originalname };      
                await uploadBytesResumable(imageRef, item.buffer, metatype);
                products.push(`https://firebasestorage.googleapis.com/v0/b/${process.env.STORAGE_BUCKET}/o/${item.originalname}?alt=media`);
            }
                
                return  res.json(
                     products      
                )
              }
              
        
        catch (error) {
            console.log(error)
        }
       
    
}
}

export default new UploadController