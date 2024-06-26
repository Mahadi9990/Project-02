import { errorHandeler } from "./error.js";
import jwt from 'jsonwebtoken'

export const verifyToken=(req,res,next)=>{
    const token =req.cookies.access_token;
    if(!token)return next(errorHandeler(401,'Unauthorize'))

    jwt.verify(token,process.env.JWTWEBTOKEN,(err,user)=>{
        if(err)return next(errorHandeler(402,'Forbiden'))
        req.user =user;
        next()
    })

}