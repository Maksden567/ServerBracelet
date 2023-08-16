import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'

const app= express()
app.use(cors({
    origin:'http://localhost:8080',
    credentials:true,
    
}))
mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@vs194.mirohost.net:27017`).then(
    console.log('DB START')
)

app.get("/user",(req,res)=>{
    res.json("Привет Макс")
})

app.listen(5000,()=>{
    console.log('server start')
})