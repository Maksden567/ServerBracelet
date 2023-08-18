import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'
import authRouter from './routes/AuthRouter.js'
import ProductRoute from './routes/ProductRoute.js'
import CategoryRouter from './routes/CategoryRouter.js'
import CollectionRouter from './routes/CollectionRouter.js'
import multer from 'multer'
import {storage} from './firebase.js'
import  {
    ref,
    uploadBytesResumable,
    listAll,
    deleteObject,
  } from "firebase/storage"
import OrderRouter from './routes/OrderRouter.js'

const app= express()
app.use(express.json())
app.use(cors({
    origin:'http://localhost:8080',
    credentials:true,
    
}))

//multer
const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });

//add image

app.post("/upload", upload.array("pic"), async (req, res) => {
    const files=req.files
    const products=[]
    await Promise.all( files.map(async (item)=>{
        const imageRef=ref(storage,item.originalname)
        console.log(imageRef)
        const metatype= { contentType:item.mimetype, name: item.originalname };
        console.log(metatype)
        await uploadBytesResumable(imageRef, item.buffer, metatype).then((snapshot) => {
            products.push(`https://firebasestorage.googleapis.com/v0/b/server-462bc.appspot.com/o/${item.originalname}?alt=media`)
           
        })
       
    }))
    return  res.json(
         products      
    )
  });



mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@vs194.mirohost.net:27017/test`).then(

    console.log('DB START')
)

app.use("/auth",authRouter)
app.use('/products',ProductRoute)
app.use('/categories',CategoryRouter)
app.use('/collections',CollectionRouter)
app.use('/orders',OrderRouter)

app.listen(5000,()=>{
    console.log('server start')
})