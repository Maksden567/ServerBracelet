import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'
import authRouter from './routes/AuthRouter.js'
import ProductRoute from './routes/ProductRoute.js'
import CategoryRouter from './routes/CategoryRouter.js'
import CollectionRouter from './routes/CollectionRouter.js'
import OrderRouter from './routes/OrderRouter.js'
import SendRouter from './routes/SendRouter.js'
import UploadRouter from './routes/UploadRoute.js'
import SubCollectionsRouter from './routes/SubCollectionsRouter.js'
import GalleryRoute from './routes/GalleryRoute.js'

const app= express()
app.use(express.json())
app.use(cors({
    origin:'http://localhost:8080',
    credentials:true,
    
}))


mongoose.connect(`mongodb://root:h4buErPeywGPzU570t@vs194.mirohost.net:27017/test`).then(

    console.log('DB START')
)

app.use("/auth",authRouter)
app.use('/products',ProductRoute)
app.use('/categories',CategoryRouter)
app.use('/collections',CollectionRouter)
app.use('/orders',OrderRouter)
app.use('/letter',SendRouter)
app.use("/upload", UploadRouter );
app.use('/subcollections',SubCollectionsRouter)
app.use('/galleries',GalleryRoute)
app.listen(8000,()=>{
    console.log('server start')
})