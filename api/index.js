import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import userRoute from './routes/User.route.js'
import authRoute from './routes/auth.route.js'

import cookieParser from 'cookie-parser';
dotenv.config();


mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connect with mongoose")
}).catch((err)=>{
    console.log("cannot connect with mongoose")
})
const app =express()
app.use(express.json())
app.use(cookieParser())

app.listen(3000,()=>{
    console.log("Server is runing on port 3000")
})

app.use("/api/user",authRoute)
app.use("/api/example",userRoute)
app.use("/api/create",userRoute)



app.use((err,req,res,next)=>{
    const statusCode =err.statusCode || 500;
    const message =err.message || 'Internal server error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})

