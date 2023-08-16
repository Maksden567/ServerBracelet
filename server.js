import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'
import authRouter from './routes/AuthRouter.js'

const app= express()
app.use(express.json())
app.use(cors({
    origin:'http://localhost:8080',
    credentials:true,
    
}))

mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@vs194.mirohost.net:27017`).then(

    console.log('DB START')
)

app.use("/auth",authRouter)

app.listen(5000,()=>{
    console.log('server start')
})