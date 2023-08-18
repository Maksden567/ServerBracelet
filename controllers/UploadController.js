import multer from 'multer'
import {storage} from './firebase.js'
import  {ref,uploadBytesResumable} from "firebase/storage"


const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });


class UploadController {
    async upload (){
       
        upload.array("pic"), async (req, res) => {
            const files=req.files
            const products=[]
            for (const item of files) {
            const imageRef = ref(storage, item.originalname);
            console.log(imageRef);
        
            const metatype = { contentType: item.mimetype, name: item.originalname };
            console.log(metatype);
        
            await uploadBytesResumable(imageRef, item.buffer, metatype);
            products.push(`https://firebasestorage.googleapis.com/v0/b/server-462bc.appspot.com/o/${item.originalname}?alt=media`);
        }
            
            return  res.json(
                 products      
            )
          }
          }
    
}

export default new UploadController