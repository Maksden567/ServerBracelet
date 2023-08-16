import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

const app= express()
mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@vs194.mirohost.net:27017`).then(
    console.log('DB START')
)


app.listen(5000,()=>{
    console.log('server start')
})